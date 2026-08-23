param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$projectRoot = $PSScriptRoot
$port = 5174
$pidFile = Join-Path $projectRoot '.portfolio-server.pid'

function Show-PortfolioMessage([string]$message, [string]$icon = 'Information') {
  Add-Type -AssemblyName PresentationFramework
  [System.Windows.MessageBox]::Show($message, 'Ma Qinglin Portfolio', 'OK', $icon) | Out-Null
}

try {
  $listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1

  if (-not $listener) {
    if (Test-Path -LiteralPath $pidFile) {
      Remove-Item -LiteralPath $pidFile -Force
    }
    if (-not $DryRun) {
      Show-PortfolioMessage '作品集服务器当前没有运行。'
    }
    exit 0
  }

  $listenerPid = [int]$listener.OwningProcess
  $listenerProcess = Get-CimInstance Win32_Process -Filter "ProcessId = $listenerPid" -ErrorAction SilentlyContinue
  $isPortfolioServer = ($null -ne $listenerProcess) -and ($listenerProcess.Name -eq 'node.exe') -and ($listenerProcess.CommandLine -like "*$projectRoot*") -and ($listenerProcess.CommandLine -like '*vite*')

  if (-not $isPortfolioServer) {
    Show-PortfolioMessage '端口 5174 属于其他程序，为避免误关，未执行关闭。' 'Warning'
    exit 1
  }

  if (-not $DryRun) {
    Stop-Process -Id $listenerPid -Force -ErrorAction SilentlyContinue

    for ($attempt = 0; $attempt -lt 20; $attempt += 1) {
      Start-Sleep -Milliseconds 100
      $stillListening = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
      if (-not $stillListening) { break }
    }

    if (Test-Path -LiteralPath $pidFile) {
      Remove-Item -LiteralPath $pidFile -Force
    }
  }
} catch {
  Show-PortfolioMessage $_.Exception.Message 'Error'
  exit 1
}
