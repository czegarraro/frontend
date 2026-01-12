$filePath = "src\components\layout\FilterBar.tsx"
$content = Get-Content $filePath -Raw

# Find the section after "Causa Raíz" dropdown and before "Duration Min"
$pattern = '(\s+</div>\s+\n\s+{/\* Duration Min \*/})'

$newControls = @"

              {/* Auto-Remediated Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  ¿Autoremediado?
                </label>
                <select
                  value={tempFilters.isAutoRemediated}
                  onChange={(e) => setTempFilters({ ...tempFilters, isAutoRemediated: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Auto-Remediation Worked Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  ¿Funciona el Autoremediado?
                </label>
                <select
                  value={tempFilters.autoRemediationWorked}
                  onChange={(e) => setTempFilters({ ...tempFilters, autoRemediationWorked: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
"@

$content = $content -replace $pattern, ($newControls + '$1')
$content | Set-Content $filePath
