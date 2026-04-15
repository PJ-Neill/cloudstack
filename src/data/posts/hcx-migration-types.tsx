export default function HcxMigrationTypesContent() {
  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      <h2 style={h2}>Before You Start: Check Your EVC Compatibility</h2>

      <div style={evcCallout}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.75rem' }}>
          ⚠️ EVC mismatch will block live migrations entirely
        </div>
        <p style={{ ...p, fontSize: '0.95rem' }}>Before you even look at migration types, sort out your EVC compatibility. This one catches people out more than almost anything else on AVS projects.</p>
        <p style={{ ...p, fontSize: '0.95rem' }}>EVC masks CPU instruction sets at the cluster level so VMs can vMotion between hosts with different CPU generations without falling over. When you&apos;re migrating from on-premises into AVS, you&apos;re moving VMs between two environments that are almost certainly running on different CPU generations. If your on-premises cluster EVC baseline is higher than what AVS is running, live migration is blocked.</p>
        <p style={{ ...p, fontSize: '0.95rem' }}>That means vMotion and RAV are both off the table. You&apos;re doing Cold Migration until you sort it out. Fixing it means lowering your EVC baseline on-premises, which requires powering off or evacuating VMs first. That work needs to happen well before your migration window, not the night before.</p>
        <p style={{ ...p, fontSize: '0.95rem', marginBottom: 0 }}>AVS runs on current-generation Azure dedicated hardware, so it&apos;ll typically be running a higher EVC baseline than an older on-premises cluster. Pull up the VMware EVC compatibility matrix, compare it against your cluster CPU generations, and get any remediation into the project plan early.</p>
        <div style={{ background: 'rgba(245,158,11,0.1)', borderLeft: '3px solid #f59e0b', borderRadius: '0 6px 6px 0', padding: '0.75rem 1rem', marginTop: '1rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: '#f59e0b' }}>The rule:</strong> your source EVC baseline needs to be equal to or lower than the destination for live migration to work. If it&apos;s not, Cold Migration is your only option.
        </div>
      </div>

      <h2 style={h2}>The Five Migration Types at a Glance</h2>

      <div style={{ margin: '1.5rem 0 2rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)', background: 'var(--surface-card)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-card)' }}>
          <div style={tableHeader}>Migration Type</div>
          <div style={{ ...tableHeader, borderLeft: '1px solid var(--border-card)', minWidth: '160px' }}>Downtime</div>
        </div>
        {[
          { type: 'vMotion', downtime: 'None', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
          { type: 'Replication Assisted vMotion (RAV)', downtime: 'None', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
          { type: 'Bulk Migration', downtime: 'Minutes', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { type: 'OS Assisted Migration (OSAM)', downtime: 'Minutes', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { type: 'Cold Migration', downtime: 'Full outage', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
        ].map(({ type, downtime, color, bg }, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', borderBottom: i < 4 ? '1px solid var(--border-card)' : 'none' }}>
            <div style={{ padding: '0.85rem 1.1rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{type}</div>
            <div style={{ padding: '0.85rem 1.1rem', borderLeft: '1px solid var(--border-card)', minWidth: '160px' }}>
              <span style={{ background: bg, color, border: `1px solid ${color}40`, padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>{downtime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* vMotion */}
      <div style={{ ...migrationCard, borderTop: '3px solid #10b981' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
          <div>
            <div style={cardTitle}>vMotion</div>
            <div style={cardSubtitle}>Zero downtime, but don&apos;t use it for bulk</div>
          </div>
        </div>
        <div style={metaRow}>
          <Badge color="#10b981" bg="rgba(16,185,129,0.12)">No downtime</Badge>
          <Badge color="var(--text-subtle)" bg="var(--surface-card)" border="var(--border-card)">Low scale</Badge>
          <Badge color="var(--text-subtle)" bg="var(--surface-card)" border="var(--border-card)">No Enterprise required</Badge>
        </div>
        <p style={p}>Everyone knows vMotion. VM stays on, moves live, cutover is instant. No downtime, no drama.</p>
        <p style={p}>The problem is scale. vCenter caps at 8 concurrent vMotions and queues the rest. Submit 50 VMs and you&apos;ll be watching a progress bar for a very long time. It&apos;s the right tool for the last handful of critical VMs in a wave, not for shifting hundreds of machines.</p>
        <p style={p}>HCX handles all the vMotion traffic over the Interconnect and encrypts it in transit, so you&apos;re not wrestling with routing vMotion traffic directly across to AVS.</p>
        <div style={useFor}><strong style={{ color: '#0062f5' }}>Use it for:</strong> The last few critical VMs in a migration wave where you can&apos;t afford downtime and the numbers are small.</div>
        <h3 style={h3}>⚠️ Gotchas</h3>
        <GotchaGrid items={[
          { icon: '⏱️', title: '8 concurrent vMotions maximum', body: 'vCenter queues everything beyond 8. Submit 50 VMs and the other 42 sit waiting. Plan accordingly.' },
          { icon: '📡', title: 'Requires 100 Mbps or above throughput', body: 'vMotion is sensitive to bandwidth. A congested ExpressRoute during a migration window means stalls. Check your available throughput before you kick off.' },
          { icon: '🔒', title: 'HCX vMotion defaults to Opportunistic encryption mode', body: "HCX defaults to Opportunistic, not Required. If your security policy mandates encryption on vMotion traffic, check this before you start rather than after." },
        ]} />
      </div>

      {/* Bulk */}
      <div style={{ ...migrationCard, borderTop: '3px solid #f59e0b' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
          <div>
            <div style={cardTitle}>Bulk Migration</div>
            <div style={cardSubtitle}>The workhorse of most AVS migrations</div>
          </div>
        </div>
        <div style={metaRow}>
          <Badge color="#f59e0b" bg="rgba(245,158,11,0.1)">Minutes downtime</Badge>
          <Badge color="#4f8ef7" bg="rgba(79,142,247,0.1)">High scale</Badge>
          <Badge color="var(--text-subtle)" bg="var(--surface-card)" border="var(--border-card)">No Enterprise required</Badge>
        </div>
        <p style={p}>Bulk uses vSphere Replication to copy VM disks to AVS in the background while the VM keeps running on-premises. When you hit your migration window, it powers the VM off, does a final delta sync, and powers it back on in AVS. The outage is usually a few minutes.</p>
        <p style={p}>This is what most of your migration waves will use. It scales well, you can run large numbers of VMs in parallel, and you can schedule windows in advance. One thing worth knowing: Bulk creates a fresh VM at the destination rather than moving the original. The source stays put until you&apos;re happy and manually tidy up.</p>
        <div style={useFor}><strong style={{ color: '#0062f5' }}>Use it for:</strong> Dev, test, and non-critical workloads in volume. The default pick for most waves.</div>
        <h3 style={h3}>⚠️ Gotchas</h3>
        <GotchaGrid items={[
          { icon: '💤', title: 'There is a downtime window', body: "It's short, usually a few minutes, but there is one. Make sure app owners know before the window, not during it." },
          { icon: '🐢', title: 'Gen 2 AVS can experience slower throughput on Bulk', body: "Covered in the Gen 1 vs Gen 2 post, but worth repeating: HCX Bulk and RAV on Gen 2 can stall during Base Sync and Online Sync phases. Always test with a small batch before committing to a full wave." },
          { icon: '📁', title: 'Source VM is not deleted automatically', body: "Bulk creates a new VM at the destination. The source stays there until you delete it. You'll need capacity headroom at both sites simultaneously, so factor that into your sizing." },
        ]} />
      </div>

      {/* RAV */}
      <div style={{ ...migrationCard, borderTop: '3px solid #7c3aed' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
          <div>
            <div style={cardTitle}>Replication Assisted vMotion (RAV)</div>
            <div style={cardSubtitle}>Bulk scale, vMotion cutover, zero downtime</div>
          </div>
        </div>
        <div style={metaRow}>
          <Badge color="#10b981" bg="rgba(16,185,129,0.12)">No downtime</Badge>
          <Badge color="#4f8ef7" bg="rgba(79,142,247,0.1)">High scale</Badge>
          <Badge color="#4f8ef7" bg="rgba(79,142,247,0.1)">Enterprise required</Badge>
        </div>
        <p style={p}>RAV does what Bulk and vMotion can&apos;t do individually. It replicates VM disks to AVS in the background using vSphere Replication, keeps syncing delta changes while the VM runs on-premises, and then when your switchover window hits, a final delta vMotion hands the running VM over with no downtime.</p>
        <p style={p}>It&apos;s the right pick for large VMs where you need zero downtime but can&apos;t afford to wait for a live vMotion of several hundred gigabytes of data across an ExpressRoute. Databases and file servers are the obvious candidates.</p>
        <h3 style={h3}>How RAV Works Under the Hood</h3>
        <p style={p}>There are three phases. First, <strong>Base Sync</strong> copies the full disk contents to AVS using vSphere Replication. Once that finishes, <strong>Delta Sync</strong> kicks in and keeps replicating changed blocks while the VM carries on running. When your switchover window opens, a <strong>Delta vMotion</strong> cuts the live VM state across with minimal disruption. Multiple VMs replicate concurrently during the sync phases, but the final switchover runs serially, one VM at a time per Service Mesh pair.</p>
        <p style={p}>RAV handles latency and varying network conditions reasonably well during the sync phases, which matters on a WAN migration over ExpressRoute. You need 150 Mbps or above throughput and HCX Enterprise activated in AVS before you can use it.</p>
        <div style={useFor}><strong style={{ color: '#0062f5' }}>Use it for:</strong> Production databases and large VMs where zero downtime is non-negotiable and there&apos;s too much data to vMotion live.</div>
        <h3 style={h3}>⚠️ Gotchas</h3>
        <GotchaGrid items={[
          { icon: '🔄', title: 'Live switchover is serial, not parallel', body: 'Replication runs in parallel across multiple VMs, but the final vMotion cutover is serial, one at a time per Service Mesh pair. If you\'re cutting over a big wave, your switchover window needs to account for that.' },
          { icon: '📸', title: 'Snapshots are not migrated', body: "Snapshots don't travel with the VM. Consolidate them before you kick off the migration or you'll have a tidy-up job at the destination." },
          { icon: '💽', title: 'Independent disks are not supported', body: "RAV relies on snapshots under the hood. Independent disks don't produce delta disks when snapshotted, so RAV can't track their changes. Change the disk type or pick a different migration method for these VMs." },
          { icon: '🗄️', title: 'RDMs in Physical Compatibility mode are not supported', body: 'RDMs in physical compatibility mode are a no-go for RAV. Identify these VMs early and plan an alternative before your migration window arrives.' },
          { icon: '⚡', title: 'Fault Tolerant VMs need special handling', body: 'Turn off Fault Tolerance before migrating, then turn it back on once the VM is live in AVS. Easy to forget in a busy migration window.' },
          { icon: '🖥️', title: 'VMware software appliances cannot be migrated with RAV', body: "vCenter Server, NSX Manager and similar appliances can't be moved with RAV. Use Cold Migration for these or plan a separate process." },
          { icon: '🔌', title: 'VMs with attached serial port devices are not supported', body: "Detach any serial port devices before starting. If you can't, Bulk Migration will handle these workloads instead." },
        ]} />
      </div>

      {/* Cold */}
      <div style={{ ...migrationCard, borderTop: '3px solid #ef4444' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
          <div>
            <div style={cardTitle}>Cold Migration</div>
            <div style={cardSubtitle}>Off, copy, back on. Simple as that.</div>
          </div>
        </div>
        <div style={metaRow}>
          <Badge color="#ef4444" bg="rgba(239,68,68,0.1)">Full outage</Badge>
          <Badge color="var(--text-subtle)" bg="var(--surface-card)" border="var(--border-card)">Any scale</Badge>
          <Badge color="var(--text-subtle)" bg="var(--surface-card)" border="var(--border-card)">No Enterprise required</Badge>
        </div>
        <p style={p}>Cold Migration is exactly what it sounds like. Power the VM off on-premises, copy the disks to AVS, power it back on. No replication, no delta syncing, no complexity.</p>
        <p style={p}>It&apos;s the simplest option available and works well for anything that has an agreed maintenance window. Legacy systems, test boxes, low-priority workloads. It&apos;s also your fallback if EVC compatibility rules out live migration entirely.</p>
        <div style={useFor}><strong style={{ color: '#0062f5' }}>Use it for:</strong> VMs with agreed downtime windows, low-priority workloads, and anything blocked from live migration by an EVC mismatch.</div>
        <h3 style={h3}>⚠️ Gotchas</h3>
        <GotchaGrid items={[
          { icon: '⏳', title: 'Outage duration depends entirely on disk size', body: "A 2TB disk takes a long time to copy over ExpressRoute. Don't size your maintenance window on what you hope the throughput will be. Measure it first." },
          { icon: '🚫', title: 'VMs with attached ISOs or virtual media will fail', body: 'Mounted ISOs and virtual media will cause the migration to fail. Detach them before you start.' },
        ]} />
      </div>

      {/* OSAM */}
      <div style={{ ...migrationCard, borderTop: '3px solid #0ea5e9' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
          <div>
            <div style={cardTitle}>OS Assisted Migration (OSAM)</div>
            <div style={cardSubtitle}>For when your source isn&apos;t vSphere</div>
          </div>
        </div>
        <div style={metaRow}>
          <Badge color="#f59e0b" bg="rgba(245,158,11,0.1)">Minutes downtime</Badge>
          <Badge color="#4f8ef7" bg="rgba(79,142,247,0.1)">High scale</Badge>
          <Badge color="#4f8ef7" bg="rgba(79,142,247,0.1)">Enterprise required</Badge>
        </div>
        <p style={p}>Not everyone migrating to AVS is coming from a pure vSphere environment. If you&apos;ve got Hyper-V or KVM workloads in the mix, OSAM lets you move them directly into AVS without doing a conversion first.</p>
        <p style={p}>It works by installing a lightweight agent inside the guest OS. The replication is driven from inside the VM rather than at the hypervisor level, so the underlying platform doesn&apos;t matter. Windows and Linux guests are both supported.</p>
        <div style={useFor}><strong style={{ color: '#0062f5' }}>Use it for:</strong> Hyper-V or KVM VMs you need to get into AVS without a separate P2V or V2V conversion step.</div>
        <h3 style={h3}>⚠️ Gotchas</h3>
        <GotchaGrid items={[
          { icon: '🤖', title: 'Requires a guest agent to be installed', body: "Every VM needs an agent installed before you can migrate it. If you've got a large estate, build agent deployment into the project plan well before your migration window." },
          { icon: '🐧', title: 'Only supported for Linux and Windows guests', body: "OSAM isn't a universal converter. Check your guest OS versions against the supported list before you build it into your plan." },
        ]} />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-card)', margin: '3rem 0' }} />

      <p style={p}>For most projects you&apos;ll end up using Bulk for the majority of VMs and RAV for anything business critical that needs zero downtime. vMotion is there for the small number of VMs at the end of a wave where you need a clean live cutover. Cold Migration is your friend for anything with an agreed window or an EVC problem. OSAM handles anything that isn&apos;t vSphere.</p>
      <p style={p}>Don&apos;t reach for vMotion by default just because it feels familiar. It won&apos;t scale. Spend time getting comfortable with RAV on a small batch early in the project and it&apos;ll carry the weight of your production waves.</p>
      <p style={p}>And sort your EVC compatibility before you get anywhere near a migration window.</p>

    </div>
  )
}

function Badge({ children, color, bg, border }: { children: React.ReactNode; color: string; bg: string; border?: string }) {
  return (
    <span style={{
      background: bg,
      color,
      border: `1px solid ${border ?? color + '40'}`,
      padding: '0.15rem 0.6rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
    }}>
      {children}
    </span>
  )
}

function GotchaGrid({ items }: { items: { icon: string; title: string; body: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
      {items.map(({ icon, title, body }, i) => (
        <div key={i} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '1rem 1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{title}</span>
          </div>
          <div style={{ paddingLeft: '1.85rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65 }}>{body}</div>
        </div>
      ))}
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
  fontSize: '16px',
  fontWeight: 700,
  color: 'var(--text-secondary)',
  margin: '1.5rem 0 0.5rem',
}

const p: React.CSSProperties = {
  marginBottom: '16px',
}

const tableHeader: React.CSSProperties = {
  padding: '0.85rem 1.1rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-subtle)',
}

const migrationCard: React.CSSProperties = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-card)',
  borderRadius: '14px',
  padding: '1.8rem',
  margin: '2rem 0',
}

const cardTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.15rem',
  fontWeight: 800,
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em',
}

const cardSubtitle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: 'var(--text-subtle)',
  marginTop: '0.2rem',
}

const metaRow: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap' as const,
  marginBottom: '1rem',
}

const useFor: React.CSSProperties = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-card)',
  borderRadius: '8px',
  padding: '0.85rem 1rem',
  margin: '1.25rem 0',
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
}

const evcCallout: React.CSSProperties = {
  background: 'rgba(245,158,11,0.06)',
  border: '1px solid rgba(245,158,11,0.2)',
  borderRadius: '12px',
  padding: '1.6rem',
  margin: '1.5rem 0 2rem',
}
