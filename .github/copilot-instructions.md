# CyberSentry - AI Coding Agent Instructions

## Project Overview
CyberSentry is a **public, authentication-free cybersecurity dashboard** providing security tools (breach checking, log analysis, password tools, security scanning). Built with React + TypeScript + Vite, styled with TailwindCSS + shadcn/ui, backed by Supabase.

## Architecture Pattern: Anonymous-First Design

**No traditional auth** - users tracked via UUID sessions stored in localStorage:
```typescript
// Session created via useAnonymousSession() hook
const sessionId = uuid(); // Stored in localStorage
// Activity saved to Supabase `anonymous_user_data` table
await supabase.from('anonymous_user_data').insert({ user_id: sessionId, ... });
```

**Key principle**: All features work without login. Security score calculated from anonymous activity.

## Critical Data Flow Pattern

### Log Analysis Pipeline (Most Complex Feature)
```
File Upload → useLogAnalyzer() hook
  ↓
processLogFile() in use-log-processing.ts
  ↓
supabase.functions.invoke('analyze-logs') [Edge Function in Deno]
  ↓ Parallel
  ├─→ Parse log (JSON/CSV/TXT) 
  ├─→ AI analysis (threat detection)
  └─→ BetterStack integration (external API)
  ↓
Return LogAnalysisResult with insights + threat levels
  ↓
Store in analysisHistory state + anonymous_user_data table
```

**Implementation pattern**: Complex logic split into focused hooks (`use-log-analyzer.ts`, `use-log-processing.ts`, `use-analysis.ts`, `use-notifications.ts`) then re-exported from `hooks/log-analyzer.ts`.

## Component Architecture

### UI Components (shadcn/ui pattern)
- Base components in `src/components/ui/` (button, card, dialog, etc.)
- **Use CVA (class-variance-authority)** for variants:
```typescript
const buttonVariants = cva("base-classes", {
  variants: { variant: { default: "...", destructive: "..." } }
});
```
- Compose with `cn()` utility from `@/lib/utils` for className merging
- Always use Radix UI primitives for accessibility

### Feature Components
- Group by feature: `components/LogAnalyzer/`, `components/Dashboard/`, etc.
- Page components in `src/pages/` are layout containers
- Use `Layout.tsx` wrapper for all pages (includes TopNavbar, Breadcrumbs, Chatbot)

## State Management Patterns

### Server State: TanStack Query (React Query)
```typescript
// Example from codebase - not yet widely used, but preferred for future API calls
const { data, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: async () => { /* fetch */ }
});
```

### Local State: Custom Hooks + useState
- **Pattern**: Feature-specific hooks encapsulate logic (see `hooks/useSecurityScore.ts`, `hooks/useAnonymousData.ts`)
- **Real-time subscriptions** via Supabase channels:
```typescript
const channel = supabase.channel('user-data-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'user_data' }, 
    (payload) => { /* update state */ })
  .subscribe();
// Always cleanup: return () => supabase.removeChannel(channel);
```

## Supabase Integration

### Edge Functions (Deno-based serverless)
Located in `supabase/functions/`:
- `analyze-logs/` - AI-powered log analysis
- `send-breach-notification/` - Email breach alerts

**Invoke pattern**:
```typescript
const { data, error } = await supabase.functions.invoke('function-name', {
  body: { /* payload */ }
});
```

### Database Tables
- `anonymous_user_data` - User activity tracking (data_type, data_payload JSON)
- `api_keys` - Custom API integrations
- `profiles` - Optional user profiles
- Auto-generated types in `src/integrations/supabase/types.ts`

## Styling & Theming

### CSS Variables Pattern
Theme colors defined in `src/index.css` as HSL CSS variables:
```css
--primary: 256 67% 75%;  /* Cyber purple */
--accent: 199 85% 49%;   /* Cyan blue */
```
Reference in components: `className="bg-primary text-primary-foreground"`

### Custom Cyber Theme Colors
- `cyber-purple`, `cyber-blue`, `cyber-dark-purple` in Tailwind config
- Gradient backgrounds: `bg-gradient-to-br from-cyber-dark-purple via-cyber-dark-purple/95 to-black`
- Glass morphism effects common in dashboard widgets

## Development Workflow

### Build Commands
```bash
bun run dev         # Dev server on port 8080
bun run build       # Production build
bun run build:dev   # Dev mode build
bun run preview     # Preview prod build
```

### Adding New Tools/Features
1. Create page in `src/pages/NewTool.tsx`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/config/navigation.ts`
4. Create feature components in `src/components/NewTool/`
5. Add custom hook in `src/hooks/useNewTool.ts` if complex state
6. Update SEO config in `src/config/seo.ts`

### Adding shadcn/ui Components
Components already configured in `components.json`. To add new ones:
```bash
npx shadcn@latest add [component-name]
```

## Type Safety Patterns

### Strict TypeScript
- Define types in `src/types/` directory (logs.ts, navigation.ts, etc.)
- Use enums for constants: `enum ThreatLevel { LOW = "low", MEDIUM = "medium", HIGH = "high" }`
- Interface for data structures: `interface LogAnalysisResult { ... }`

### Props Typing
```typescript
interface ComponentProps {
  onAction: () => void;
  data?: SomeType; // Optional with ?
}
const Component: React.FC<ComponentProps> = ({ onAction, data }) => { ... }
```

## External API Integrations

### Security APIs Used
- **HIBP (Have I Been Pwned)**: `https://api.pwnedpasswords.com/range/` - Password breach checking (k-anonymity pattern)
- **SSL Labs**: `https://api.ssllabs.com/api/v3/analyze` - SSL cert analysis
- **NVD**: `https://services.nvd.nist.gov/rest/json/cves/1.0` - CVE lookups
- **BetterStack**: `https://s1309632.eu-nbg-2.betterstackdata.com` - Log monitoring

### API Pattern
Most APIs called directly from components/hooks, not proxied. Store keys in `.env` as `VITE_*` variables.

## SEO & Accessibility

### SEO Setup
- Every page uses `<SEOHead>` component with title, description, keywords
- Structured data via `<StructuredData>` component (WebSite, Organization, SoftwareApplication schemas)
- Breadcrumbs auto-generated from route path
- Sitemap and robots.txt in `public/`

### Accessibility
- Radix UI provides ARIA attributes
- Use semantic HTML: `<section aria-labelledby="id">`, `<h2 id="id" className="sr-only">`
- Screen-reader text with `sr-only` class

## Common Gotchas

1. **File paths**: Always use `@/` alias for imports (configured in `vite.config.ts`)
2. **Toast notifications**: Use `toast()` from `@/hooks/use-toast`, NOT direct imports
3. **Theme**: Default is `dark`, stored in localStorage as `cybersentry-theme`
4. **Anonymous sessions**: Always check `sessionId` exists before Supabase operations
5. **Real-time subs**: Must cleanup channels in useEffect return to prevent memory leaks

## Testing & Debugging

No formal test suite currently. Debugging via:
- Browser DevTools + React DevTools
- Vite's HMR for instant feedback
- `console.log` statements (clean up before commit)
- Supabase dashboard for database inspection

## Deployment

Configured for **Vercel** (see `vercel.json`). Build automatically triggered on push to main.
