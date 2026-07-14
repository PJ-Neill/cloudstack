export default function AlzTerraformAcceleratorContent() {
  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      <p style={p}>Every team that sets up an Azure Landing Zone from scratch hits the same wall. The architecture makes sense on paper. Management group hierarchy, policy assignments, hub network. But turning that into working Terraform, wired to a pipeline, with state management and approval gates, takes far longer than anyone budgets for.</p>

      <p style={p}>The ALZ Terraform Accelerator solves that. It&apos;s Microsoft&apos;s opinionated framework for bootstrapping a production-ready Azure Landing Zone using Terraform and Azure Verified Modules. You run a PowerShell module, answer some questions about your environment, and it handles the rest.</p>

      <h2 style={h2}>What It Actually Does</h2>

      <p style={p}>The accelerator has two jobs: set up your Azure infrastructure and wire up your source control. Both happen in the same bootstrap run.</p>

      <div style={twoCol}>
        <DeployCard label="Azure" items={[
          'Resource groups for state and identity',
          'Managed identities with federated credentials',
          'Storage account for Terraform state',
          'Management groups and policy assignments',
          'Hub networking (hub-spoke or vWAN)',
        ]} />
        <DeployCard label="Source Control" items={[
          'Module and pipeline template repositories',
          'CI/CD pipelines or GitHub Actions',
          'Branch policies and approval gates',
          'Separate Plan and Apply environments',
        ]} />
      </div>

      <p style={p}>The result is a complete delivery environment, not a zip file of Terraform you have to figure out yourself. Everything is wired up and ready for your team to start customising.</p>

      <h2 style={h2}>Who It&apos;s For</h2>

      <p style={p}>Teams that want to land on Azure properly from day one, without spending weeks writing boilerplate infrastructure before a single workload goes anywhere. It&apos;s also useful for organisations that already have a landing zone but want to bring it under proper CI/CD without rebuilding from scratch.</p>

      <p style={p}>Both GitHub and Azure DevOps are supported on the source control side. If Terraform isn&apos;t your tool of choice, there&apos;s a Bicep path too.</p>

      <Callout icon="ℹ️" title="Built on Azure Verified Modules" type="info">
        The accelerator uses AVM under the hood, so the modules it deploys are maintained by Microsoft and the community, not something you&apos;re responsible for keeping current.
      </Callout>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-card)', margin: '2.5rem 0' }} />

      <p style={p}>The full step-by-step guide, starter module documentation, and everything you need to run your first bootstrap is on GitHub.</p>

      <GitHubCTA
        href="https://github.com/Azure/alz-terraform-accelerator"
        repo="Azure/alz-terraform-accelerator"
        desc="Full documentation, starter modules, and step-by-step bootstrap guide."
      />

    </div>
  )
}

function DeployCard({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: '10px',
      padding: '1.1rem 1.2rem',
    }}>
      <div style={{
        fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.75rem',
      }}>{label}</div>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {items.map(item => (
          <li key={item} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: '#60a5fa', fontSize: '0.8rem', flexShrink: 0, marginTop: '0.2rem' }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Callout({ icon, title, children, type }: { icon: string; title: string; children: React.ReactNode; type: 'info' | 'warn' }) {
  const isWarn = type === 'warn'
  return (
    <div style={{
      display: 'flex', gap: '1rem', alignItems: 'flex-start',
      background: isWarn ? 'rgba(245,158,11,0.05)' : 'rgba(0,98,245,0.08)',
      border: `1px solid ${isWarn ? 'rgba(245,158,11,0.35)' : 'rgba(0,98,245,0.25)'}`,
      borderRadius: '8px', padding: '1rem 1.25rem', margin: '1.5rem 0',
    }}>
      <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isWarn ? '#f59e0b' : '#60a5fa', marginBottom: '0.2rem' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  )
}

function GitHubCTA({ href, repo, desc }: { href: string; repo: string; desc: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        background: 'var(--surface-card)', border: '1px solid var(--border-card)',
        borderRadius: '10px', padding: '1.2rem 1.4rem', margin: '1.5rem 0',
        textDecoration: 'none', color: 'inherit',
      }}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--text-muted)" style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.2rem' }}>GitHub</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{repo}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{desc}</div>
      </div>
      <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', flexShrink: 0 }}>→</span>
    </a>
  )
}

const twoCol: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  margin: '1.5rem 0',
}

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  margin: '36px 0 16px',
  letterSpacing: '-0.02em',
}

const p: React.CSSProperties = { marginBottom: '16px' }
