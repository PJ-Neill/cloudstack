export default function AvsGen1VsGen2Content() {
  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      <h2 style={h2}>A Bit of Background</h2>
      <p style={p}>
        Azure VMware Solution (AVS) has always sat in an interesting place — it lets you run VMware workloads natively on Azure dedicated hardware, bridging the gap between on-premises VMware environments and the Azure cloud. Gen 1 worked well, but it came with a networking model that felt distinctly un-Azure. ExpressRoute circuits, seed cluster requirements, and additional networking setup were the price of admission.
      </p>
      <p style={p}>
        It has been particularly popular because leveraging VMware HCX allows customers to extend their on-premises IP address space directly into AVS using Layer 2 network extensions. This means workloads can be migrated without re-IP-ing — a huge operational win that removes one of the biggest friction points in any data centre migration project.
      </p>
      <p style={p}>
        Gen 2 changes that. Microsoft has re-engineered AVS to deploy directly inside an Azure Virtual Network, bringing it in line with how everything else in Azure works. That single shift has a cascade of positive effects — fewer moving parts, better performance, and a dramatically simpler path to Azure-native integration.
      </p>

      <h2 style={h2}>Gen 1 vs Gen 2: Side by Side</h2>
      <p style={p}>The diagrams below show the most fundamental change — the shift from a dedicated ExpressRoute circuit inside AVS in Gen 1, to native Virtual Network integration in Gen 2:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2rem' }}>
        <div>
          <img
            src="/avs-gen1-diagram.png"
            alt="Azure VMware Solution Gen 1 - ExpressRoute networking diagram"
            style={{ width: '100%', height: '240px', objectFit: 'cover', objectPosition: 'top', borderRadius: '10px', border: '1px solid var(--border-card)', display: 'block' }}
          />
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
            // Gen 1 — Dedicated AVS ExpressRoute Circuit
          </p>
        </div>
        <div>
          <img
            src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/native-connectivity/native-connect-on-premises.png"
            alt="Azure VMware Solution Gen 2 native Virtual Network connectivity diagram"
            style={{ width: '100%', height: '240px', objectFit: 'cover', objectPosition: 'top', borderRadius: '10px', border: '1px solid var(--border-card)', display: 'block' }}
          />
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
            // Gen 2 — Native Azure VNet Integration · Source: Microsoft Learn
          </p>
        </div>
      </div>

      <p style={p}>Here&apos;s how the two generations compare across the key dimensions:</p>

      <div style={{ margin: '1.5rem 0 2rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)', background: 'var(--surface-card)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-card)' }}>
          <div style={tableHeader}>Feature</div>
          <div style={{ ...tableHeader, color: '#f59e0b', borderLeft: '1px solid var(--border-card)' }}>⬡ Gen 1</div>
          <div style={{ ...tableHeader, color: '#3b82f6', borderLeft: '1px solid var(--border-card)' }}>⬡ Gen 2</div>
        </div>
        {[
          ['Supported SKU Types', 'AV36, AV36P, AV52, AV48 + AV64 (requires seed cluster)', 'AV64 only (min. 3-host cluster)'],
          ['Network Attach Model', 'ExpressRoute', 'Virtual Network (VNet)'],
          ['vSAN Architecture', 'OSA (Original Storage Architecture)', 'ESA (Express Storage Architecture)'],
          ['Seed Cluster Required', 'Yes (for AV64 deployments)', 'No — deploy AV64 directly'],
          ['VNet Peering', 'Not available', 'Works out of the box'],
          ['NSG Support', 'Not available', 'Fully supported'],
          ['Availability Zone Selection', 'Not available', 'Supported'],
          ['Private DNS Resolution', 'Not available', 'Supported'],
        ].map(([feature, gen1, gen2], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', borderBottom: i < 7 ? '1px solid var(--border-card)' : 'none' }}>
            <div style={{ padding: '0.85rem 1.1rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{feature}</div>
            <div style={{ padding: '0.85rem 1.1rem', fontSize: '0.85rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-card)' }}>{gen1}</div>
            <div style={{ padding: '0.85rem 1.1rem', fontSize: '0.85rem', color: '#60a5fa', borderLeft: '1px solid var(--border-card)' }}>{gen2}</div>
          </div>
        ))}
      </div>

      <h2 style={h2}>⚠️ Gotchas to Watch Out For</h2>
      <p style={p}>Before you commit to a deployment or migration, here are some real-world considerations worth keeping front of mind:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.25rem 0 2rem' }}>
        {[
          { icon: '⚡', title: 'Low latency between AVS and Azure native services?', body: 'Gen 2 is the answer. Native VNet integration eliminates the ExpressRoute hop, delivering significantly lower latency for workloads that depend on tight integration with Azure PaaS services.', warn: false },
          { icon: '🔄', title: 'Hot migrating VMs from on-premises to AVS?', body: 'Always check EVC (Enhanced vMotion Compatibility) compatibility first. CPU instruction set mismatches between source and destination hosts can cause migrations to fail or VMs to behave unexpectedly post-migration.', warn: false },
          { icon: '💾', title: 'Keep at least 30% free on your vSAN datastore', body: 'vSAN requires headroom for rebalancing, rebuilds, and slack space operations. Letting utilisation creep above 70% can trigger performance degradation and, in worst cases, place the datastore in a read-only state.', warn: false },
          { icon: '🐢', title: 'HCX RAV and Bulk migrations on Gen 2 — expect slower performance', body: 'HCX Replication Assisted vMotion (RAV) and Bulk migrations on Gen 2 can experience significantly slower throughput due to stalls during the Base Sync and Online Sync phases. Plan migration windows accordingly and test with a small batch before committing to large-scale cuts.', warn: true },
          { icon: '📋', title: 'VMware licensing is no longer bundled with AVS', body: 'VMware licensing is no longer included in your AVS costs from Microsoft. You now need to request a VCF (VMware Cloud Foundation) subscription directly from Broadcom to cover your licensing entitlements. Factor this into your cost planning before deployment.', warn: true },
          { icon: '🌍', title: 'Global Reach is required for on-premises to AVS connectivity in Gen 1', body: 'In Gen 1, connecting your on-premises environment to AVS via ExpressRoute requires ExpressRoute Global Reach. It is not included in your AVS costs, carries its own pricing, and is not available in every Azure region. Check availability early in your planning process.', warn: false },
          { icon: '🖥️', title: 'HCX appliances consume your AVS cluster capacity', body: 'HCX appliances run directly on your AVS cluster nodes, not on separate infrastructure. They consume compute and memory resources that would otherwise be available to your workloads, so make sure to factor them into your initial sizing calculations.', warn: false },
          { icon: '💸', title: 'Stretched clusters cost double — fast', body: 'If you need availability zone redundancy via stretched clusters, you will need a minimum of 6 nodes split across two zones (3 per zone). That is double the node count before you have even deployed a single workload, so model the cost carefully before committing to this architecture.', warn: true },
          { icon: '💰', title: 'Buy Reserved Instances as soon as possible', body: 'PAYG pricing for AVS nodes is significantly more expensive than Reserved Instances. If you know your environment is going to be running for any meaningful length of time, get onto 1 or 3 year reservations early. The savings are substantial and this is one of the easiest cost wins available.', warn: true },
          { icon: '🔐', title: 'You do not get full admin access to vSphere or the underlying ESXi hosts', body: 'In AVS, Microsoft manages the underlying infrastructure. The highest level of access you get is the built-in CloudAdmin account, which has a restricted set of vSphere permissions. You cannot access ESXi hosts directly, and certain low-level operations simply are not available to you. This is a managed service trade-off, but it can make deep troubleshooting difficult and in some cases leaves you reliant on Microsoft Support to investigate issues at the infrastructure layer. Make sure your team understands this boundary before go-live.', warn: false },
          { icon: '🔌', title: 'ExpressRoute is required if you want to migrate via HCX', body: 'While you can connect to AVS over a VPN, HCX migrations require an ExpressRoute connection to be in place. If you are planning to use HCX to move workloads from on-premises, make sure ExpressRoute is part of your design from day one. ExpressRoute with Global Reach provides the fastest and most reliable on-premises connection to AVS and should be the default choice for any serious migration project.', warn: false },
          { icon: '🗺️', title: 'Gen 2 has strict route limits — plan your network segments carefully', body: 'Gen 2 imposes a hard limit of 1000 prefixes on the virtual network address space. This includes NSX segment routes, service routes, and HCX MON host routes all counting toward the same limit. On a 3-node cluster you get 4096 /28s worth of capacity, and a 4-node cluster gives you 6144. If you are planning a large number of network segments or heavy use of HCX Mobility Optimised Networking (MON), you can burn through this budget faster than you expect. The fix is to use fewer, larger prefixes where possible, summarise routes, and do the maths before you deploy.', warn: true },
          { icon: '🌐', title: 'Public IP down to the NSX Edge is not supported in Gen 2', body: 'In Gen 2, you cannot assign a Public IP directly to the VMware NSX Microsoft Edge for internet configuration. Instead, route your egress internet traffic through your hub VNet using Azure Firewall or a third-party Network Virtual Appliance (NVA). This is the recommended pattern anyway as it gives you centralised inspection, logging, and control over all outbound traffic leaving AVS.', warn: false },
        ].map(({ icon, title, body, warn }, i) => (
          <div key={i} style={{
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            background: warn ? 'rgba(245,158,11,0.05)' : 'var(--surface-card)',
            border: `1px solid ${warn ? 'rgba(245,158,11,0.35)' : 'var(--border-card)'}`,
            borderRadius: '8px', padding: '1rem 1.25rem',
          }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>{icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: warn ? '#f59e0b' : 'var(--text-secondary)', marginBottom: '0.2rem' }}>{title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      <p style={p}>
        If there&apos;s one thing that defines Gen 2, it&apos;s the shift from ExpressRoute to Virtual Network connectivity. In Gen 1, your AVS private cloud connected to Azure via an ExpressRoute circuit — a dedicated private link that, while reliable, added complexity, cost, and friction when integrating with other Azure services.
      </p>
      <p style={p}>
        Gen 2 private clouds deploy <em>inside</em> an Azure Virtual Network by default. That means you get instant connectivity to other Azure services the moment your cloud is provisioned. No extra networking setup. VNet peering just works. You can attach Network Security Groups directly to control traffic. For architects who&apos;ve spent time wrestling with AVS Gen 1 network topology, this is a significant quality-of-life improvement.
      </p>

      <div style={calloutInfo}>
        <strong>Worth noting:</strong> This isn&apos;t just convenience — deploying inside a VNet also reduces latency for workloads that talk to other Azure services, and improves data transfer speeds. For latency-sensitive applications that rely on services like Azure SQL or Blob Storage, this is a meaningful performance gain.
      </div>

      <h2 style={h2}>SKU Changes: AV64 Takes Centre Stage</h2>
      <p style={p}>
        Gen 2 exclusively supports the <code style={code}>AV64</code> SKU, with a minimum of 3 hosts required. In Gen 1, deploying AV64 meant you first had to provision a seed cluster of at least three nodes using an older SKU (AV36, AV36P, AV48, or AV52), then add AV64 on top.
      </p>
      <p style={p}>
        Gen 2 eliminates that step entirely — you go straight to AV64. The AV64 node is Microsoft&apos;s latest-generation VMware host, offering significantly more compute and memory than its predecessors. Removing the seed cluster requirement also reduces the minimum entry cost for new deployments.
      </p>

      <div style={calloutWarn}>
        <strong>Keep in mind:</strong> If you&apos;re already running a Gen 1 deployment on AV36, AV36P, AV48, or AV52 SKUs, those aren&apos;t supported in Gen 2. This matters for planning migrations or expansions — Gen 2 is an AV64-only environment.
      </div>

      <h2 style={h2}>vSAN: OSA Out, ESA In</h2>
      <p style={p}>
        Under the hood, Gen 2 moves from vSAN&apos;s Original Storage Architecture (OSA) to the Express Storage Architecture (ESA). ESA is VMware&apos;s newer storage model, designed to take advantage of NVMe-based storage more efficiently than OSA. You get better throughput, lower latency storage operations, and a more modern foundation for running I/O-intensive workloads.
      </p>
      <p style={p}>
        For most workloads this will be transparent — but if you&apos;re running database servers, analytics platforms, or anything else with demanding storage requirements, the ESA upgrade is a genuine win.
      </p>

      <h2 style={h2}>Regional Availability</h2>
      <p style={p}>
        Gen 2 is currently available in the following Azure public regions. Microsoft has noted that additional regions may be available — contact your Microsoft account team to confirm coverage elsewhere.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem', margin: '1rem 0 1.5rem' }}>
        {['Australia East', 'East US', 'Canada Central', 'Canada East', 'Central US', 'Malaysia West', 'North Europe', 'Norway East', 'Switzerland North', 'UK West', 'West US 2'].map(r => (
          <span key={r} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', color: 'var(--text-muted)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{r}</span>
        ))}
      </div>

      <h2 style={h2}>Who is Responsible for What? Does it Change in Gen 2?</h2>
      <p style={p}>
        Short answer — no, it does not. The shared responsibility model remains the same in Gen 2 as it does in Gen 1. Despite the architectural shift to native VNet integration, Microsoft still owns the infrastructure layer and you still own everything above it. Gen 2 does not change the boundary, it just makes the networking around it simpler.
      </p>
      <p style={p}>
        One of the most common sources of confusion with AVS is understanding where Microsoft&apos;s responsibility ends and yours begins. Unlike a traditional IaaS VM where you own almost everything above the hypervisor, AVS is a managed service — Microsoft takes on a significant portion of the operational burden, but that does not mean you can switch off entirely.
      </p>
      <p style={p}>
        Microsoft handles the physical infrastructure, physical security, hardware failures, ESXi host patching, VMware NSX, vSAN, vCenter Server, and HCX Manager. You are responsible for things like your VMs, Guest OS, applications, identity management, and connecting to your VNet and the internet. The matrix below makes this clear:
      </p>

      <div style={{ margin: '1.5rem 0 1rem' }}>
        <img
          src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/introduction/azure-introduction-shared-responsibility-matrix.png"
          alt="Azure VMware Solution Shared Responsibility Matrix"
          style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-card)', display: 'block' }}
        />
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
          Azure VMware Solution — Shared Responsibility Matrix · Source: Microsoft Learn
        </p>
      </div>

      <p style={{ ...p, marginTop: '1.25rem' }}>
        The practical takeaway here ties directly to the CloudAdmin gotcha above — because Microsoft owns the infrastructure layer, you cannot always get to the root cause of an issue yourself. Understanding this matrix before you go live helps set the right expectations with your team and your stakeholders.
      </p>

      <h2 style={h2}>Should You Move to Gen 2?</h2>
      <p style={p}>
        If you&apos;re planning a <strong>new AVS deployment</strong>, Gen 2 is the clear choice. The simplified networking, direct VNet integration, and removal of the seed cluster requirement make it easier to deploy and cheaper to get started. You&apos;re also building on a more modern foundation that will be better aligned with future Azure VMware Solution capabilities.
      </p>
      <p style={p}>
        If you have an <strong>existing Gen 1 deployment</strong>, the picture is more nuanced. There&apos;s no in-place migration path between Gen 1 and Gen 2 — they&apos;re architecturally different enough that moving requires planning. If your Gen 1 environment is stable and serving its purpose, there&apos;s no immediate pressure to migrate. But for organisations looking to expand their AVS footprint, new clusters should absolutely be built on Gen 2.
      </p>
      <p style={p}>
        Gen 2 feels like Microsoft finally listened. AVS has always been a solid platform, but it always had that slightly bolted-on feeling when it came to networking. Gen 2 fixes that. It sits inside your VNet, plays nicely with the rest of Azure, and removes a lot of the head-scratching that came with Gen 1. If you are starting fresh, there is really no reason to look at Gen 1. And if you are already running Gen 1, it is worth keeping an eye on the migration path as it matures.
      </p>

      <div style={calloutInfo}>
        <strong>Next steps:</strong> The <a href="https://learn.microsoft.com/en-us/azure/azure-vmware/native-network-design-consideration" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>network design considerations guide</a> is also worth reading before you start.
      </div>

      <p style={{ ...p, marginTop: '2rem' }}>
        And one final thought — AVS has a new look, a new networking model, and a new storage architecture... but why can I <em>still</em> not rename the cluster? 😂
      </p>

      <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(0,98,245,0.08)', border: '1px solid rgba(0,98,245,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>👉</span>
        <p style={{ margin: 0, color: '#60a5fa', fontWeight: 600, fontSize: '0.95rem' }}>Coming next: HCX — a deep dive into L2 network extensions and migrations.</p>
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

const p: React.CSSProperties = {
  marginBottom: '20px',
}

const code: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.82em',
  background: 'rgba(0,98,245,0.1)',
  color: '#60a5fa',
  padding: '0.1em 0.4em',
  borderRadius: '3px',
}

const tableHeader: React.CSSProperties = {
  padding: '0.85rem 1.1rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-subtle)',
}

const calloutInfo: React.CSSProperties = {
  borderRadius: '8px',
  padding: '1.25rem 1.4rem',
  margin: '1.5rem 0 2rem',
  borderLeft: '4px solid #0062f5',
  background: 'rgba(0,98,245,0.08)',
  color: 'var(--text-muted)',
  fontSize: '0.93rem',
}

const calloutWarn: React.CSSProperties = {
  borderRadius: '8px',
  padding: '1.25rem 1.4rem',
  margin: '1.5rem 0 2rem',
  borderLeft: '4px solid #f59e0b',
  background: 'rgba(245,158,11,0.07)',
  color: '#d4a855',
  fontSize: '0.93rem',
}
