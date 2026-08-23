param(
  [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'

$projectRoot = $PSScriptRoot
$port = 5174
$localUrl = "http://127.0.0.1:$port/"
$pidFile = Join-Path $projectRoot '.portfolio-server.pid'

function Test-PortfolioServer {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $localUrl -TimeoutSec 2
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

function Show-PortfolioError([string]$message) {
  Add-Type -AssemblyName PresentationFramework
  [System.Windows.MessageBox]::Show($message, 'Ma Qinglin Portfolio', 'OK', 'Error') | Out-Null
}

try {
  if (-not (Test-PortfolioServer)) {
    $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
    if (-not $npmCommand) {
      $npmCommand = Get-Command npm -ErrorAction SilentlyContinue
    }
    if (-not $npmCommand) {
      Show-PortfolioError 'Node.js / npm was not found. Please install Node.js first.'
      exit 1
    }

    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules'))) {
      $install = Start-Process -FilePath $npmCommand.Source -ArgumentList @('install') -WorkingDirectory $projectRoot -WindowStyle Hidden -Wait -PassThru
      if ($install.ExitCode -ne 0) {
        Show-PortfolioError 'Dependency installation failed. Check the network and try again.'
        exit 1
      }
    }

    $server = Start-Process -FilePath $npmCommand.Source -ArgumentList @('run', 'dev', '--', '--host', '0.0.0.0', '--port', $port.ToString()) -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru

    $ready = $false
    for ($attempt = 0; $attempt -lt 60; $attempt += 1) {
      Start-Sleep -Milliseconds 250
      if (Test-PortfolioServer) {
        $ready = $true
        break
      }
      if ($server.HasExited) { break }
    }

    if (-not $ready) {
      Show-PortfolioError 'The portfolio server did not start. Please run the shortcut again.'
      exit 1
    }
  }

  # npm.cmd starts an outer cmd process; record the real Vite listener instead.
  $listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $listener) {
    Show-PortfolioError 'The portfolio server is running, but its listening process could not be found.'
    exit 1
  }

  $listenerProcess = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)" -ErrorAction SilentlyContinue
  $isPortfolioListener = ($null -ne $listenerProcess) -and ($listenerProcess.Name -eq 'node.exe') -and ($listenerProcess.CommandLine -like "*$projectRoot*") -and ($listenerProcess.CommandLine -like '*vite*')

  if (-not $isPortfolioListener) {
    Show-PortfolioError '端口 5174 已被其他程序占用，为避免打开错误页面，未执行启动。'
    exit 1
  }

  Set-Content -LiteralPath $pidFile -Value $listener.OwningProcess -Encoding ascii

  if (-not $NoOpen) {
    Start-Process $localUrl
  }
} catch {
  Show-PortfolioError $_.Exception.Message
  exit 1
}
