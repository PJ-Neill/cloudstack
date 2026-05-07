export default function AlzCorpOnlineLocalContent() {
  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      <p style={p}>Corp. Short for corporate. &quot;Corporate&quot; just reminds me of Michael Scott from The Office 😂. It&apos;s an Americanism, really, usually interchangeable with &quot;company&quot; or &quot;organisation&quot; depending on where you&apos;re from.</p>
      <p style={p}>But here we are. Corp exists, it&apos;s staying, and as of April 2026 it has a new sibling: the <strong>Local</strong> management group. Microsoft added it to the ALZ conceptual architecture. Worth understanding what they actually mean.</p>

      <h2 style={h2}>The Management Group Hierarchy</h2>
      <p style={p}>The ALZ Landing Zones management group has always had two child groups: Corp and Online. The new architecture adds a third, sitting alongside them.</p>
      <p style={p}>Each group has different policy assignments, which is what actually defines their behaviour. The structure itself is just a container. It&apos;s the policies applied at each scope that make Corp feel different from Online.</p>

      <div style={{ margin: '1.5rem 0' }}>
        <img
          src="/alz-hierarchy.webp"
          alt="Azure Landing Zone management group hierarchy showing Corp, Online and Local"
          style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-card)', display: 'block' }}
        />
      </div>

      <h2 style={h2}>Corp (Yes, That One)</h2>
      <p style={p}>&quot;Corp&quot; is short for corporate network connectivity. That&apos;s it. Nothing to do with your organisation structure, nothing to do with the word &quot;corporate&quot; in any cultural sense. It&apos;s the management group for workloads that require private connectivity back to on-premises or to other landing zones via the hub.</p>
      <p style={p}>If your workload needs to talk to an on-premises SQL server, hit a shared service sitting in another subscription, or route through your hub firewall, Corp is the right home. In the standard ALZ vending model, a Corp subscription gets a spoke VNet pre-created and peered back to the hub. It&apos;s ready for private traffic from day one.</p>
      <Callout icon="⚠️" title="Gotcha: Corp doesn't mean &quot;private only&quot;" type="warn">
        Workloads in Corp can still serve traffic from the internet. Corp means private hub connectivity is available and policy enforces private DNS. It doesn&apos;t mean nothing is public-facing.
      </Callout>

      <p style={p}>From a policy perspective, Corp gets two guardrails that Online doesn&apos;t:</p>
      <ul style={ul}>
        <li>Public network access should be disabled for PaaS services</li>
        <li>Configure Azure PaaS services to use private DNS zones</li>
      </ul>
      <p style={p}>Those two policies are the actual mechanical difference between Corp and Online. Everything else, RBAC, logging, tagging, security baselines, those are applied higher up the hierarchy and land on both.</p>

      <Callout icon="💡" title="Policy exemptions exist for a reason" type="info">
        If a workload in Corp has one component that genuinely needs to be public, create a policy exemption, document it, and review it periodically. Moving the whole subscription to Online just to avoid the exemption creates worse problems, especially around DNS and private endpoint ownership.
      </Callout>

      <h2 style={h2}>Online</h2>
      <p style={p}>Online is for workloads without the private hub connectivity requirement. There&apos;s no pre-created spoke VNet, no peering to the hub, and the PaaS privacy policies don&apos;t apply. App teams have more freedom.</p>
      <p style={p}>That doesn&apos;t mean Online subscriptions are a free-for-all. Teams can still deploy their own VNets, private endpoints, and service endpoints. They just own those themselves rather than inheriting them from the platform. Their private DNS zones are local to the app, not linked to the central zones in the hub.</p>

      <Callout icon="🚨" title="Gotcha: Online does not mean insecure" type="warn">
        Online workloads can be just as locked down as Corp ones. The distinction is whether they depend on central hub connectivity, not whether they&apos;re exposed to the internet.
      </Callout>

      <p style={p}>Good candidates for Online: SaaS-style workloads accessible over the internet, dev/test environments with no on-prem access requirement, and anything where the team wants to own its own network controls end-to-end.</p>

      <h2 style={h2}>Local (The New One)</h2>
      <p style={p}>Microsoft has added a dedicated &quot;Local&quot; management group, and the name refers to <strong>Azure Local</strong>, not &quot;local&quot; in the general sense. It sits alongside Corp and Online under Landing Zones and is designed for two distinct scenarios.</p>

      <h3 style={h3}>Workloads running on Azure Local clusters</h3>
      <p style={p}>The first scenario is straightforward. If you&apos;re deploying workloads directly onto Azure Local clusters, Local gives you a consistent management group scope to apply governance and security guardrails. Policies from the Azure Local product group will land here over time. There&apos;s now a clear, opinionated home for them in the hierarchy.</p>

      <h3 style={h3}>Exit-ready workloads in the public cloud</h3>
      <p style={p}>This is the more interesting scenario. Some customers, particularly those with sovereignty or business continuity requirements, need to know their workloads could move to Azure Local disconnected operations (ALDO) if they ever needed to. Maybe it&apos;s a regulatory requirement. Maybe it&apos;s an insurance policy against connectivity loss. Either way, they need a credible exit story.</p>
      <p style={p}>The new Local management group supports this through a new built-in policy: <em>Restrict resource types to Azure services supported in Azure Local disconnected operations</em>. Run it in Audit mode to get visibility on which resource types in your subscriptions aren&apos;t available in ALDO, without changing any developer behaviour. Run it in Deny mode to actively prevent deployment of anything that would break the exit story.</p>

      <Callout icon="🆕" title="The key point here" type="info">
        Workloads don&apos;t need to run on Azure Local today to benefit from the Local management group. You can keep them running in the public cloud, enforce ALDO portability by policy, and guarantee they&apos;re exit-ready without tracking it manually in a spreadsheet.
      </Callout>

      <h2 style={h2}>Already in the ALZ Accelerator</h2>
      <p style={p}>These changes shipped in <code style={code}>platform/alz/2026.04.2</code> and are already reflected in the ALZ Accelerator. New deployments via <a href="https://aka.ms/alz/accelerator" target="_blank" rel="noopener noreferrer" style={link}>aka.ms/alz/accelerator</a> will get the Local management group out of the box.</p>
      <p style={p}>If you&apos;re on an existing deployment, Microsoft has published upgrade guidance for both Terraform and Bicep. The Terraform path is at <a href="https://azure.github.io/Azure-Landing-Zones/terraform/howtos/update" target="_blank" rel="noopener noreferrer" style={link}>Azure-Landing-Zones/terraform/howtos/update</a> and the Bicep equivalent at the Azure Landing Zones docs site. The Portal accelerator update was due to follow shortly after the library release.</p>
      <p style={p}>The full announcement from the Azure Governance and Management team is on the <a href="https://techcommunity.microsoft.com/blog/azuregovernanceandmanagementblog/new-local-management-group-for-alz--updated-sovereign-policies-for-slz/4515156" target="_blank" rel="noopener noreferrer" style={link}>Microsoft Tech Community blog</a>.</p>

    </div>
  )
}

function Callout({ icon, title, children, type }: { icon: string; title: string; children: React.ReactNode; type: 'warn' | 'info' }) {
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
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isWarn ? '#f59e0b' : '#60a5fa', marginBottom: '0.2rem' }} dangerouslySetInnerHTML={{ __html: title }} />
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
  margin: '1.5rem 0 0.75rem',
}

const p: React.CSSProperties = { marginBottom: '16px' }

const ul: React.CSSProperties = {
  paddingLeft: '1.5rem',
  marginBottom: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
}

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
