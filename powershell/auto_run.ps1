# Check if Apache HTTPD service is existing
# If not render error
# Else 
# Check if the service is running
# if not render error

# Check if localhost is accessible 
 
function Check-ApacheService {
    $services =  Get-Service -Name ApacheHttpdServer -ErrorAction SilentlyContinue
    if ($services.Length -gt 0) {
        return $true
    }
    else {
        return $false
    }
}

function Check-ApacheServiceStatus {
    $service =  Get-Service -Name ApacheHttpdServer -ErrorAction SilentlyContinue
    if ($service.Status -eq 'Running') {
        return $true
    }
    else {
        return $false
    }
}

function Get-HostStatus {
    [boolean]$hostOnline 
    $hostOnline = $true
    try {
        $req = Invoke-WebRequest -uri 'http://localhost' -UseBasicParsing
    }
    catch {
        $hostOnline = $false
    }

    return $hostOnline
}

function Show-WarningBox {
    param (
        [string]$text
    )
    $msgBoxbuttonType = [System.Windows.MessageBoxButton]::OK
    $msgBoxTitle = 'Warning'
    $msgboxBody = $text
    $msgBoxIcon =[System.Windows.MessageBoxImage]::Error
    $result = [System.Windows.MessageBox]::Show($msgboxBody, $msgBoxTitle, $msgBoxbuttonType, $msgBoxIcon)
}

if ((Check-ApacheService) -ne $true) {
    Show-WarningBox -text 'No service found with, Name=ApacheHttpdServer and DispalyName=Apache Httpd Server'
}
elseif ((Check-ApacheServiceStatus) -ne $true){
    Show-WarningBox -text 'Apache service is not running.'
}
else {
    $sleepCount = 1
    $timeExceded = $false
    $serverStatus = Get-HostStatus

    while ($serverStatus -eq $false -and $timeExceded -ne $true) {
    
        $timeExceded
        Write-Host 'host offline for' ($sleepCount * 10) 'seconds.'
        if ($sleepCount -gt 30) {
            $timeExceded = $true
            break
        }
        else {
            Start-sleep -Seconds 1
        } 
        $sleepCount++
        $serverStatus = Get-HostStatus
    }

    if ($timeExceded) {
        Show-WarningBox -text 'Webservice service not available on http://localhost'
    }
    else {
        #test if page exists
        $error.Clear()
        try {
        $HTTP_Request = [System.Net.WebRequest]::Create('http://localhost/standalone.html')
        $HTTP_Response = $HTTP_Request.GetResponse()
        $HTTP_Status = [int]$HTTP_Response.StatusCode
        $HTTP_Response.close()
        }
        catch {
            Show-WarningBox -text 'Could not locate standalone version at http://localhost/standalone.html'
        }
        If (!$error) {
            Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList '--start-fullscreen "http://localhost/standalone.html" --hide-crash-restore-bubble'
        }

    }

}




                 