$filePath = "src\pages\AnalyticsPage.tsx"
$content = Get-Content $filePath -Raw

# Add imports
$content = $content -replace "import PieChartWithPadAngle from '@/components/charts/PieChartWithPadAngle';", @"
import PieChartWithPadAngle from '@/components/charts/PieChartWithPadAngle';
import RootCauseDonutChart from '@/components/charts/RootCauseDonutChart';
import AutoRemediationDonutChart from '@/components/charts/AutoRemediationDonutChart';
"@

# Add new section before closing divs
$newSection = @"

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Root Cause Donut Chart */}
        <RootCauseDonutChart />

        {/* Auto-Remediation Donut Chart */}
        <AutoRemediationDonutChart />
      </div>
"@

# Find the last closing div before the final return closing
$pattern = '(      </Card>\s+      </div>\s+    </div>)'
$replacement = '$1' + $newSection

$content = $content -replace $pattern, $replacement

$content | Set-Content $filePath
