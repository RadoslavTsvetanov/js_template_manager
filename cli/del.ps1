function Remove-FilesStartingWithNumber {
    param (
        [string]$Path = (Get-Location)
    )

    # Get all files in the specified directory
    $files = Get-ChildItem -Path $Path

    # Iterate through each file
    foreach ($file in $files) {
        # Check if the file name starts with a number
        if ($file.Name -match '^\d') {
            # Delete the file
            Remove-Item $file.FullName -Force
            Write-Host "Deleted file: $($file.FullName)"
        }
    }

    Write-Host "Deletion complete."
}