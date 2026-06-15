export default function AzureMigrateFileSharesContent() {
  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      <p style={p}>Every migration project has one. The file server nobody owns. A decade of departmental shares, mapped drives welded into login scripts, and a folder called <code style={code}>DO NOT DELETE</code> that predates everyone on the payroll.</p>

      <p style={p}>VMs get the royal treatment in Azure Migrate. Discovery, dependency maps, right-sizing, cost models. File shares? A PowerShell script, a spreadsheet, and a guess. That always struck me as backwards, because in my experience it&apos;s rarely the VM that breaks the cutover. It&apos;s the data behind it.</p>

      <p style={p}>That&apos;s changed. In two stages.</p>

      <h2 style={h2}>What&apos;s Actually New</h2>

      <p style={p}>April first. Microsoft <a href="https://techcommunity.microsoft.com/blog/azuremigrationblog/discover-and-assess-file-shares-for-migration-to-azure-files-with-azure-migrate/4509034" target="_blank" rel="noopener noreferrer" style={link}>announced discovery and assessment</a> for SMB and NFS shares hosted on Windows and Linux servers. The existing Azure Migrate appliance does all of it, agentlessly. Nothing installed in the guests, no new tooling to learn. Update the appliance and it starts finding shares.</p>

      <p style={p}>Then last week the other shoe dropped. The <a href="https://techcommunity.microsoft.com/blog/azuremigrationblog/azure-copilot-migration-agent/4501292" target="_blank" rel="noopener noreferrer" style={link}>Azure Copilot Migration Agent</a>, which Microsoft made publicly available back in March, <a href="https://techcommunity.microsoft.com/blog/azurestorageblog/file-share-migrations-simplified-with-azure-copilot-migration-agent/4524563" target="_blank" rel="noopener noreferrer" style={link}>now covers file share migrations end to end</a>. Azure Migrate handles discovery, assessment and planning. Storage Mover moves the data. One guided flow, and you can drive it in plain English from the portal.</p>

      <Callout icon="🆕" title="One workflow, start to finish" type="new">
        Until now you&apos;d discover shares one way, size them another, and migrate them with a third tool. The agent stitches Azure Migrate and Storage Mover together so context carries through instead of dying in a handover.
      </Callout>

      <Figure
        src="https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00NTI0NTYzLUpqR2RZTA?revision=9"
        alt="Azure Copilot Migration Agent guiding a file share migration in the Azure portal"
        caption="The Copilot Migration Agent connecting discovery through to execution."
      />

      <p style={p}>Worth being precise about scope. The full end-to-end agent experience covers SMB shares going to Azure Files. NFS shares get discovered and assessed, but you&apos;re driving Storage Mover yourself for the actual move.</p>

      <h2 style={h2}>How Discovery Works</h2>

      <p style={p}>The appliance enumerates shares across your discovered servers and pulls back the useful stuff. Storage consumed, file counts, access patterns. A few hours for most estates, and it all lands in the same inventory you already use, sitting under the Infrastructure tab next to the servers hosting it. Filter or tag your way to the shares you care about.</p>

      <Figure
        src="https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00NTA5MDM0LXpDdUp5Zw?image-dimensions=903x372&revision=4"
        alt="Discovered SMB and NFS file shares listed in the Azure Migrate inventory"
        caption="Discovered file shares in the Azure Migrate inventory."
      />

      <Callout icon="🚫" title="Windows Server 2008 R2 is not supported" type="gotcha">
        The OS lacks the PowerShell capabilities and system APIs the appliance needs. Which is a shame, because if you&apos;ve still got a 2008 R2 box in production, I&apos;d put money on it being a file server. Those get the manual treatment.
      </Callout>

      <h2 style={h2}>The Assessment</h2>

      <p style={p}>Once discovery finishes, pick your shares, set a target region, tier preference and redundancy, and run the assessment. Each share comes back with three things.</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>Output</th>
            <th style={th}>What you get</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}><strong>Readiness</strong></td>
            <td style={td}>
              <span style={pillReady}>Ready</span>{' '}
              <span style={pillConditions}>Ready with Conditions</span>{' '}
              <span style={pillNotReady}>Not Ready</span>
              <br /><br />Compatibility issues, unsupported configurations and permission gaps surfaced before you migrate, not during the cutover weekend.
            </td>
          </tr>
          <tr>
            <td style={td}><strong>Tier recommendation</strong></td>
            <td style={td}>Standard or Premium per share, based on actual usage. No more paying Premium rates for a share full of stale PDFs.</td>
          </tr>
          <tr>
            <td style={td}><strong>Cost estimate</strong></td>
            <td style={td}>Monthly Azure Files cost per share, so the business case runs on numbers instead of vibes.</td>
          </tr>
        </tbody>
      </table>

      <p style={p}>Run it performance-based rather than as-is if you want tier recommendations worth anything. It&apos;s the usage data that separates the genuinely hot shares from the archives that just look big.</p>

      <Figure
        src="https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS00NTA5MDM0LUJFSkhFcg?image-dimensions=903x504&revision=4"
        alt="Azure Files assessment results showing readiness, tier recommendations and cost estimates per share"
        caption="Assessment output: readiness, recommended tier and monthly cost per share."
      />

      <Callout icon="ℹ️" title="Colocated shares get pulled into scope" type="info">
        Add a share to an assessment and the server hosting it comes along, plus every other share on that server. Sensible for accuracy. Just don&apos;t be surprised when your tidy ten-share assessment comes back with forty.
      </Callout>

      <Callout icon="⚠️" title="Assessments are point-in-time snapshots" type="warn">
        Results shift as performance data builds up or the source environment changes. If discovery has only run for a day, the tier recommendations are working from thin data. Let it soak before you take the numbers to a steering group.
      </Callout>

      <h2 style={h2}>Where Each Tool Now Sits</h2>

      <p style={p}>I wrote about <a href="/blog/azure-file-sync-vs-storage-mover" style={link}>Azure File Sync vs Storage Mover</a> a while back, and none of that comparison changes here. What&apos;s changed is the step before it. The one everyone used to skip.</p>

      <div style={flowGrid}>
        <div style={flowStep}>
          <div style={stepLabel}>Plan</div>
          <h3 style={h3}>Azure Migrate</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', margin: 0 }}>What shares exist, which are ready, what tier they need, what it&apos;ll cost.</p>
        </div>
        <div style={flowStep}>
          <div style={stepLabel}>Move</div>
          <h3 style={h3}>Storage Mover</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', margin: 0 }}>One-way bulk migration into Azure Files, driven manually or by the Copilot agent.</p>
        </div>
        <div style={flowStep}>
          <div style={stepLabel}>Stay hybrid</div>
          <h3 style={h3}>Azure File Sync</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', margin: 0 }}>If you&apos;re keeping an on-premises cache and tiering cold data rather than fully exiting.</p>
        </div>
      </div>

      <p style={p}>The Storage Mover or File Sync question is the same as it&apos;s always been. Are you leaving the building, or keeping a foot in it? The difference is you now make that call per share with real readiness and usage data in front of you, not whatever the last admin scribbled in a wiki in 2019.</p>

      <h2 style={h2}>Gotchas Before You Get Excited</h2>

      <Callout icon="🧪" title="The Copilot Migration Agent is still maturing" type="gotcha">
        It needs <a href="https://learn.microsoft.com/en-us/azure/migrate/azure-copilot-migration-agent" target="_blank" rel="noopener noreferrer" style={link}>enabling at tenant level</a> and the experience has moved fast since launch. Treat the agent as an accelerator, not a replacement for understanding what Storage Mover is doing underneath. When a transfer stalls at 2am, you&apos;ll be the one reading the job logs.
      </Callout>

      <Callout icon="🔐" title="Identity is still your problem" type="gotcha">
        The assessment flags permission gaps, but it won&apos;t design your identity story. NTFS ACLs only mean something on the other side once you&apos;ve sorted Azure Files identity-based authentication, whether that&apos;s on-premises AD DS, Entra Domain Services or Entra Kerberos. Plan it alongside the data move, not after.
      </Callout>

      <Callout icon="🗺️" title="UNC paths don't migrate themselves" type="gotcha">
        Moving the data is the easy half. Every mapped drive, login script, application config and scheduled task pointing at <code style={code}>\\oldserver\share</code> still needs a plan. I covered the options for keeping UNC paths intact in the <a href="/blog/azure-files-migration" style={link}>Azure Files migration guide</a>.
      </Callout>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-card)', margin: '2.5rem 0' }} />

      <p style={p}>For years the honest answer to &quot;how do we plan our file share migration?&quot; was a Robocopy dry run and a prayer. Now the appliance you&apos;ve already got running hands you a costed, readiness-checked inventory of the whole estate, and an agent that carries it through to Storage Mover without a tool swap in the middle.</p>

      <p style={p}>About time. Update your appliance, let discovery soak for a couple of weeks, and walk into the next planning session with actual data.</p>

      <p style={p}>Just don&apos;t ask it what&apos;s in the <code style={code}>DO NOT DELETE</code> folder. Some mysteries aren&apos;t for the cloud.</p>

    </div>
  )
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} loading="lazy" />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
        {caption}
      </p>
    </div>
  )
}

function Callout({ icon, title, children, type }: { icon: string; title: string; children: React.ReactNode; type: 'info' | 'warn' | 'gotcha' | 'new' }) {
  const styles: Record<string, { bg: string; border: string; titleColor: string }> = {
    info:   { bg: 'rgba(0,98,245,0.08)',    border: 'rgba(0,98,245,0.25)',    titleColor: '#60a5fa' },
    warn:   { bg: 'rgba(245,158,11,0.05)',  border: 'rgba(245,158,11,0.35)', titleColor: '#f59e0b' },
    gotcha: { bg: 'rgba(248,81,73,0.07)',   border: 'rgba(248,81,73,0.3)',   titleColor: '#f87171' },
    new:    { bg: 'rgba(188,140,255,0.07)', border: 'rgba(188,140,255,0.3)', titleColor: '#bc8cff' },
  }
  const s = styles[type]
  return (
    <div style={{
      display: 'flex', gap: '1rem', alignItems: 'flex-start',
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: '8px', padding: '1rem 1.25rem', margin: '1.5rem 0',
    }}>
      <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: s.titleColor, marginBottom: '0.2rem' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  )
}

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  margin: '36px 0 16px',
  letterSpacing: '-0.02em',
}

const h3: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--text-secondary)',
  margin: '0 0 0.5rem',
}

const p: React.CSSProperties = { marginBottom: '16px' }

const code: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.82em',
  background: 'rgba(0,98,245,0.1)',
  color: '#60a5fa',
  padding: '0.1em 0.4em',
  borderRadius: '3px',
}

const link: React.CSSProperties = {
  color: '#60a5fa',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '1.5rem 0',
  fontSize: '0.93rem',
}

const th: React.CSSProperties = {
  textAlign: 'left',
  fontFamily: 'var(--font-display)',
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#60a5fa',
  borderBottom: '2px solid var(--border-card)',
  padding: '0.6rem 0.75rem',
}

const td: React.CSSProperties = {
  borderBottom: '1px solid var(--border-card)',
  padding: '0.7rem 0.75rem',
  verticalAlign: 'top',
}

const pillBase: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.78rem',
  fontWeight: 600,
  borderRadius: '999px',
  padding: '0.15rem 0.7rem',
  whiteSpace: 'nowrap',
}

const pillReady: React.CSSProperties = {
  ...pillBase,
  background: 'rgba(63,185,80,0.12)',
  color: '#3fb950',
  border: '1px solid rgba(63,185,80,0.3)',
}

const pillConditions: React.CSSProperties = {
  ...pillBase,
  background: 'rgba(210,153,34,0.12)',
  color: '#d29922',
  border: '1px solid rgba(210,153,34,0.3)',
}

const pillNotReady: React.CSSProperties = {
  ...pillBase,
  background: 'rgba(248,81,73,0.12)',
  color: '#f85149',
  border: '1px solid rgba(248,81,73,0.3)',
}

const flowGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  margin: '1.5rem 0',
}

const flowStep: React.CSSProperties = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-card)',
  borderRadius: '10px',
  padding: '1.1rem 1.2rem',
}

const stepLabel: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#60a5fa',
  marginBottom: '0.5rem',
}
