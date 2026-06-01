import re
import sys

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

def strip_comments_and_strings(code):
    # Strip comments
    code = re.sub(r'/\*.*?\*/', '', code, flags=re.DOTALL)
    code = re.sub(r'//.*', '', code)

    # Strip string literals
    code = re.sub(r'"([^"\\]|\\.)*"', '""', code)
    code = re.sub(r"'([^'\\]|\\.)*'", "''", code)
    code = re.sub(r'`([^`\\]|\\.)*`', '``', code)

    # Strip JSX text
    prev_len = len(code)
    while True:
        code = re.sub(r'>[^<>{}]*<', '><', code)
        if len(code) == prev_len:
            break
        prev_len = len(code)

    return code

def analyze_hook():
    hook_path = r'D:\RailwayWeb\RailwayWeb\frontend\src\hooks\useAomState.jsx'

    with open(hook_path, 'r', encoding='utf-8') as f:
        hook_content = f.read()

    # 1. Parse imports from useAomState.jsx
    imports = []
    for match in re.finditer(r'import\s+.*?from\s+[\'"](.*?)[\'"]', hook_content, re.DOTALL):
        import_str = match.group(0)
        names = re.findall(r'(\b[a-zA-Z_][a-zA-Z0-9_]*\b)', import_str)
        if 'import' in names: names.remove('import')
        if 'from' in names: names.remove('from')
        imports.extend(names)
    
    imports_set = set(imports)
    imports_set.update([
        'React', 'useState', 'useMemo', 'useEffect', 'useRef', 'useContext', 'useCallback',
        'supabase', 'supabaseClient', 'initialStations', 'initialTrafficInspectors', 'hrmsTiDirectory',
        'assessmentCriteria', 'aomMockData', 'categoryData', 'MONTHLY_TREND', 'ASSESSMENT_MONTHLY',
        'COMPLIANCE', 'CAT_COLORS', 'RISK_COLORS', 'STATUS_COLORS', 'DASHBOARD_96_STATIONS',
        'stationProgressData', 'sidebarItems', 'summaryCards', 'designationOptions', 'departmentOptions',
        'userTypeOptions', 'reportingOfficerOptions', 'aomReadOnlyProfile', 'initialUserFormData',
        'initialFilterData', 'stationZoneOptions', 'stationDivisionOptions', 'stationCategoryOptions',
        'stationTypeOptions', 'initialStationFormData', 'initialStationFilterData', 'tiCategoryOptions',
        'tiAssessmentStatusOptions', 'stationAverageScoreData', 'initialPendingAssessments',
        'initialApprovedAssessments', 'initialReportRows', 'stationMastersDirectory'
    ])

    clean_hook = strip_comments_and_strings(hook_content)

    # 2. Find all local declarations
    local_defs = set()
    # matches like "const x = ", "let y = ", "var z = "
    for match in re.finditer(r'\b(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b', clean_hook):
        local_defs.add(match.group(2))
    # matches like "const [a, setA] = useState"
    for match in re.finditer(r'\b(const|let|var)\s*\[\s*([a-zA-Z0-9_,\s]+)\s*\]', clean_hook):
        parts = [p.strip() for p in match.group(2).split(',') if p.strip()]
        local_defs.update(parts)
    # matches like "function f("
    for match in re.finditer(r'\bfunction\s+([a-zA-Z_][a-zA-Z0-9_]*)\b', clean_hook):
        local_defs.add(match.group(1))
    # matches like "(x, y) =>" or "x =>" or "function(x)"
    # We can add typical parameter and loop variables to avoid false positives
    loop_vars = {
        'e', 'err', 'error', 'item', 'idx', 'index', 'row', 'station', 'val', 'p', 'sm', 'ss', 'tm', 'ti', 's',
        'x', 'y', 'z', 'd', 'i', 'acc', 'curr', 'prev', 'c', 't', 'u', 'sec', 'si', 'r', 'g', 'b', 'v', 'k', 'n', 'm',
        'ans', 'q', 'res', 'data', 'doc', 'id', 'role', 'title', 'key', 'answers', 'ruleKey', 'secId', 'cat', 'avg',
        'count', 'score', 'grade', 'pct', 'total', 'scored', 'totalMarks', 'tiEmployee', 'tiSmsNames', 'smsForTI',
        'pmForTI', 'approvedCount', 'smStationCodes', 'rec', 'builtSecs', 'locked', 'reject', 'form', 'pme', 'ref',
        'alc', 'commonObj', 'processedData', 'setter', 'listKey', 'savedForms', 'activePage', 'roleKey', 'roleLabel',
        'scoreData', 'status', 'byLine', 'empLine', 'lastUpdatedDate', 'avgScore', 'riskLevel', 'assessmentStatus',
        'completed', 'pending', 'name', 'code', 'division', 'category', 'roleFilterStation', 'roleFilterDivision',
        'roleFilterCat', 'roleFilterRisk', 'roleFilterName', 'stationOpts', 'divisionOpts', 'tiAssessmentFormOpen',
        'tiAssessmentAnswers', 'tiActivatedAssessments', 'allEmployees'
    }

    known_names = local_defs | imports_set | loop_vars | {
        'window', 'console', 'document', 'localStorage', 'sessionStorage', 'alert', 'confirm', 'prompt',
        'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Math', 'Array', 'Object', 'String',
        'Number', 'Boolean', 'Date', 'RegExp', 'JSON', 'undefined', 'null', 'true', 'false', 'parseFloat',
        'parseInt', 'isNaN', 'Map', 'Set', 'length', 'Event'
    }

    keywords = {
        'if', 'else', 'return', 'const', 'let', 'var', 'function', 'class', 'import', 'export', 'from',
        'default', 'true', 'false', 'null', 'undefined', 'switch', 'case', 'break', 'continue', 'for',
        'in', 'of', 'while', 'do', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'typeof', 'instanceof',
        'void', 'delete', 'debugger', 'as', 'any', 'extends', 'super'
    }

    html_stuff = {
        'div', 'span', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'img', 'input', 'textarea',
        'select', 'option', 'label', 'form', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li',
        'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'defs', 'linearGradient', 'stop',
        'className', 'onClick', 'onChange', 'onSubmit', 'value', 'type', 'placeholder', 'disabled', 'checked',
        'id', 'name', 'title', 'key', 'style', 'href', 'src', 'alt', 'width', 'height', 'fill', 'stroke',
        'strokeWidth', 'strokeLinecap', 'strokeLinejoin', 'd', 'cx', 'cy', 'r', 'x', 'y', 'x1', 'y1', 'x2', 'y2',
        'viewBox', 'points', 'transform', 'active', 'data', 'margin', 'top', 'right', 'bottom', 'left',
        'ResponsiveContainer', 'AreaChart', 'Area', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Legend',
        'BarChart', 'Bar', 'LineChart', 'Line', 'PieChart', 'Pie', 'Cell', 'Grid', 'Defs', 'Stop',
        'strokeDasharray', 'fontSize', 'textAnchor', 'color', 'size', 'defaultValue', 'rows', 'cols',
        'autoFocus', 'maxLength', 'pattern', 'required', 'readOnly', 'multiple', 'colspan', 'ArrowLeft', 'Plus',
        'PlusCircle', 'Search', 'Filter', 'Check', 'X', 'Edit', 'Trash2', 'ShieldAlert', 'ShieldCheck', 'Info',
        'Eye', 'CheckCircle', 'AlertTriangle', 'XCircle', 'Trash', 'Briefcase', 'Building', 'Clipboard',
        'Clock', 'MapPin', 'Phone', 'Mail', 'User', 'Settings', 'LogOut', 'UserCheck', 'AlertCircle', 'Star'
    }

    ignore_set = keywords | html_stuff

    all_words = set(re.findall(r'\b([a-zA-Z_][a-zA-Z0-9_]*)\b', clean_hook))
    potential_undefined = all_words - known_names - ignore_set

    real_potential = []
    for word in sorted(potential_undefined):
        if word.isupper() and len(word) > 2:
            continue
        if re.search(r'\.\s*' + word + r'\b', clean_hook):
            continue
        if re.search(r'\b' + word + r'\s*[:=]', clean_hook):
            continue
        if re.search(r'[^.\w]' + word + r'\b', clean_hook):
            real_potential.append(word)

    print("\n--- DEEP REFERENCE AUDIT OF useAomState.jsx ---")
    if real_potential:
        print(f"Found {len(real_potential)} potential undefined reference(s):")
        for word in real_potential:
            lines = []
            for i, line in enumerate(hook_content.splitlines(), 1):
                if re.search(r'\b' + word + r'\b', line) and not '//' in line and not '/*' in line:
                    lines.append(f"Line {i}: {line.strip()}")
            print(f"\n* {word} (referenced in {len(lines)} lines):")
            for line in lines[:5]:
                print(f"  {line}")
    else:
        print("PERFECT! No undefined references found in useAomState.jsx!")

if __name__ == '__main__':
    analyze_hook()
