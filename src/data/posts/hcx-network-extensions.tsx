'use client'
import { useState, useEffect } from 'react'

export default function HcxNetworkExtensionsContent() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
        >
          <img src={lightbox.src} alt={lightbox.alt} style={{ maxWidth: '92vw', maxHeight: '88vh', borderRadius: '10px', border: '1px solid var(--border-card)', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }} />
        </div>
      )}

      <h2 style={h2}>What Is HCX Network Extension?</h2>
      <p style={p}>
        VMware HCX Network Extension (NE) lets you stretch L2 networks from on-premises into AVS. VMs can be migrated without changing their IP addresses, which removes one of the biggest friction points in any large-scale migration project. Phased cutovers become far more manageable when you&apos;re not re-IPing hundreds of machines.
      </p>
      <p style={p}>
        Think of a Network Extension like a VPN tunnel between two locations, but instead of just providing IP reachability between sites, it actually stretches the Layer 2 network segment itself across the wire. With a standard VPN, your on-premises network and your cloud network are separate subnets that route to each other. With HCX NE, the on-premises network and the AVS network are the same subnet, shared across both locations. A VM on-premises and a VM in AVS can sit on the same /24, use the same default gateway, and communicate as if they were plugged into the same switch. The only difference is one of them is running in Azure.
      </p>
      <p style={p}>
        This is what makes zero-downtime, zero-re-IP migrations possible. You move the VM, it keeps its IP address, and nothing upstream needs to change. The network follows the workload.
      </p>
      <p style={p}>
        That said, HCX NE is not a set-and-forget feature. There are constraints, sequencing requirements, and routing behaviours that will cause real problems if you&apos;re not prepared for them.
      </p>

      <div
        style={{ margin: '1.5rem 0', cursor: 'zoom-in', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}
        onClick={() => setLightbox({ src: 'https://learn.microsoft.com/en-us/azure/azure-vmware/media/concepts/vmware-hcx-migration-concepts.png', alt: 'HCX Service Mesh architecture' })}
      >
        <img
          src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/concepts/vmware-hcx-migration-concepts.png"
          alt="HCX Service Mesh architecture showing on-premises vSphere environment connected to Azure VMware Solution via HCX appliances and Layer 2 Network Extension over ExpressRoute"
          style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.01)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
        HCX Service Mesh — on-premises to AVS via Layer 2 Network Extension · Source: Microsoft · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>

      <h2 style={h2}>⚠️ Gotchas to Watch Out For</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.25rem 0 2rem' }}>
        {[
          { icon: '🔌', title: 'HCX NE only works with vSphere Distributed Switch port groups', body: 'Standard Switch (vSS) port groups are not supported. Neither are untagged Distributed Port Groups. If your environment hasn\'t moved to vDS yet, that needs to happen before you can extend any networks.', warn: false },
          { icon: '🐛', title: 'Cisco Nexus 1000v will cause you problems', body: 'If your on-premises environment still uses Nexus 1000v, don\'t extend networks backed by it. These virtual switches are known to be problematic with HCX NE. Check your environment before you start.', warn: false },
          { icon: '🔢', title: 'One NE appliance each side per vDS, two with HA', body: 'HCX deploys one Network Extension appliance each side per vDS you extend. If you enable High Availability, which you should, it deploys two appliances per vDS on each side. Factor this into your resource planning.', warn: false },
          { icon: '⏰', title: 'Enable HA before you extend any networks', body: 'This is probably the most operationally painful gotcha on this list. HCX NE HA must be configured before you extend networks or migrate any VMs. If you skip it and come back later, you\'ll need to unextend every network, enable HA, and re-extend them all. Always enable HA when building your service mesh. Don\'t leave it as a day-two task.', warn: false },
          { icon: '🌐', title: 'Don\'t extend the same network from multiple vCenters', body: 'If a VLAN spans multiple vCenters, only extend it from one of them. Extending the same network from more than one vCenter into the same AVS router creates conflicting paths and risks causing an outage. Pick one source and stick with it.', warn: false },
          { icon: '📦', title: 'Match your NE MTU to your underlying network infrastructure', body: 'Ensure your Network Extension MTU matches that of the underlying network infrastructure. Typically this will be 1500 when using the recommended method of an ExpressRoute circuit. A mismatch here can cause subtle performance issues and packet fragmentation that are frustrating to diagnose after the fact.', warn: false },
          { icon: '🔧', title: 'TCP Flow Conditioning helps, but it\'s not a silver bullet', body: 'HCX TCP Flow Conditioning is extremely helpful. It applies TCP MSS Clamping to the inner TCP traffic of the Network Extension, ensuring packets fit within the established tunnel MTU. But it won\'t help if your underlay network is misconfigured, and it does nothing for UDP traffic. Don\'t rely on it as a fix for a poorly configured network. Sort the underlay first.', warn: false },
          { icon: '🧪', title: 'Test a full network cutover before going near production', body: 'Before moving any production workloads, build a small test network, extend it, migrate a VM into AVS, then unextend it and let the gateway cut over into AVS. This is the exact sequence that will happen when you retire the on-premises environment and it will surface routing issues you didn\'t know you had.\n\nWhen a network is unextended, NSX-T advertises the prefix via BGP to your connected hub. Because that prefix originally came from on-premises, your upstream routing infrastructure may have BGP filters that only accept it from on-prem, not from AVS. The AVS-originated route gets dropped, and you lose connectivity. Finding this in a test window is painful. Finding it during a production cutover is worse. Test early.', warn: true },
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
              {body.split('\n\n').map((para, j) => (
                <div key={j} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: j > 0 ? '0.6rem' : 0 }}>{para}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={h2}>HCX NE High Availability, How It Actually Works</h2>
      <p style={p}>HCX NE provides two layers of resiliency, and it&apos;s worth understanding both before you rely on them.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.25rem 0 1.5rem' }}>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>Application Path Resiliency</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>HCX creates multiple tunnel flows between Network Extension appliances for both Interconnect and Network Extension traffic. Traffic automatically takes the optimal path and shifts dynamically if conditions change between sites.</p>
        </div>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>Network Extension Appliance HA</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>With HA enabled, HCX deploys four Network Extension appliances per vDS — two at the source site and two at the destination. These form a unified HA group. One pair becomes Active, the other sits as Standby. If the Active pair fails, the Standby pair immediately takes over. No manual intervention required.</p>
        </div>
      </div>

      <div style={calloutInfo}>
        <strong>Worth noting:</strong> This is why enabling HA upfront matters so much. You don&apos;t want to be unextending networks to retrofit it after the fact.
      </div>

      <h2 style={h2}>HCX MON, What It Is and Why You Should Enable It</h2>
      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>MON stands for Mobility Optimized Networking</strong>, and it&apos;s an optional HCX Enterprise feature that solves a specific problem: the trombone effect.</p>
      <p style={p}>Here&apos;s the issue. With standard HCX NE, migrated VMs still rely on their on-premises default gateway even after they&apos;ve moved to AVS. That means a VM running in AVS trying to talk to another VM also running in AVS may route all the way back to on-prem and back again. More hops, more latency, worse application performance.</p>
      <p style={p}>MON fixes this by enabling selective cloud-side routing. Migrated VMs get a local gateway inside AVS, and traffic that should stay in AVS stays in AVS.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.25rem 0 1.5rem' }}>
        <div style={{ background: 'var(--surface-card)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#ef4444', marginBottom: '0.6rem' }}>Without MON</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>VM1 in AVS routes through the on-prem gateway and back to AVS to reach VM2. Every hop adds latency.</p>
        </div>
        <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#10b981', marginBottom: '0.6rem' }}>With MON</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>VM1 in AVS routes directly to VM2 in AVS. Local routing, lower latency, no trombone.</p>
        </div>
      </div>

      <p style={p}>Under the hood, MON uses Policy-Based Routing inside NSX-T to make these decisions. Policy routes determine whether traffic should stay within AVS via the T1 gateway, head back on-prem through the HCX NE tunnel, or exit through the T0 gateway for Azure or internet access. MON handles path selection automatically and prevents the asymmetric routing issues that would otherwise follow you into production.</p>

      <div style={calloutInfo}>
        <strong>To enable MON,</strong> make sure HCX Enterprise is activated in your AVS environment.
      </div>

      <h2 style={h2}>MON Policy Routes and Avoiding Asymmetric Traffic</h2>
      <p style={p}>MON is powerful, but it introduces routing decisions that need to be planned carefully. Get this wrong and you&apos;ll end up with asymmetric traffic flows, confused stateful firewalls, and connectivity problems that are painful to diagnose.</p>

      <div style={calloutWarn}>
        <strong>The key rule:</strong> only enable MON policy routes if your network infrastructure has been designed to handle them.
      </div>

      <p style={p}>When MON is enabled and the VM gateway has been migrated to the cloud side, NSX-T advertises a /32 host route for each MON-enabled VM back to your connected hub via BGP. This is what allows other VMs in Azure and on-premises to reach the migrated VM directly without going through the Network Extension tunnel. The diagram below shows how the VM gateway migration eliminates the trombone effect for VM-to-VM traffic on stretched segments.</p>

      <div
        style={{ margin: '1.5rem 0', cursor: 'zoom-in', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}
        onClick={() => setLightbox({ src: 'https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/hcx-mon-user-case-diagram-1.png', alt: 'VM to VM L2 optimisation with MON enabled' })}
      >
        <img
          src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/hcx-mon-user-case-diagram-1.png"
          alt="Diagram showing the optimization for VM to VM L2 communication when using stretched networks"
          style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.01)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
        VM to VM L2 optimisation with MON enabled · Source: Microsoft Learn · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>

      <p style={p}>By default, all RFC 1918 addresses are included in the MON policy route definition. This means all private IP egress traffic gets tunnelled back over the Network Extension path, while internet and public traffic routes out through the T0 gateway. That sounds sensible on the surface, but it can create problems.</p>
      <p style={p}>Here&apos;s the scenario to watch out for. A VM in Azure learns the path to an AVS VM on a MON-enabled segment. Return traffic is sent back to the T0 gateway as expected. But if the return subnet matches an RFC 1918 policy route, that traffic gets forced over the Network Extension instead, and egresses back to Azure via ExpressRoute on the on-premises side. Stateful firewalls in the path see asymmetric flows and things start breaking.</p>

      <p style={{ ...p, fontWeight: 600, color: 'var(--text-secondary)' }}>The three policy route configurations and what they do:</p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>Default RFC 1918 policy routes</strong> — all private IP egress traffic is tunnelled over the Network Extension. Internet and public traffic routes through the T0 gateway. Use with caution and only if your infrastructure accounts for the asymmetric routing implications.</p>

      <div
        style={{ margin: '1rem 0', cursor: 'zoom-in', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}
        onClick={() => setLightbox({ src: 'https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/default-hcx-mon-policy-based-routes.png', alt: 'Default RFC 1918 policy routes' })}
      >
        <img src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/default-hcx-mon-policy-based-routes.png" alt="Default RFC 1918 policy routes" style={{ width: '100%', display: 'block' }} />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
        Default RFC 1918 policy routes · Source: Microsoft Learn · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>

      <div
        style={{ margin: '1rem 0', cursor: 'zoom-in', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}
        onClick={() => setLightbox({ src: 'https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/hcx-mon-user-case-diagram-3.png', alt: 'RFC 1918 egress traffic flow with default policy routes' })}
      >
        <img src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/hcx-mon-user-case-diagram-3.png" alt="RFC 1918 egress traffic flow" style={{ width: '100%', display: 'block' }} />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
        RFC 1918 egress traffic flow with default policy routes · Source: Microsoft Learn · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>No policy routes defined</strong> — all egress traffic routes through the T0 gateway. This is the safest option if you haven&apos;t specifically designed your network to handle MON policy routing. When in doubt, start here.</p>

      <div
        style={{ margin: '1rem 0', cursor: 'zoom-in', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}
        onClick={() => setLightbox({ src: 'https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/none-hcx-mon-policy-based-routes.png', alt: 'No policy routes — all traffic via T0' })}
      >
        <img src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/none-hcx-mon-policy-based-routes.png" alt="No policy routes — all traffic via T0" style={{ width: '100%', display: 'block' }} />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
        No policy routes — all traffic via T0 · Source: Microsoft Learn · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>Default route (0.0.0.0/0)</strong> — all egress traffic, including internet, gets tunnelled over the Network Extension path. Only use this if you specifically want all traffic going back on-premises first.</p>

      <div
        style={{ margin: '1rem 0', cursor: 'zoom-in', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}
        onClick={() => setLightbox({ src: 'https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/all-traffic-hcx-mon-policy-based-routes.png', alt: '0.0.0.0/0 policy route — all traffic tunnelled over Network Extension' })}
      >
        <img src="https://learn.microsoft.com/en-us/azure/azure-vmware/media/tutorial-vmware-hcx/all-traffic-hcx-mon-policy-based-routes.png" alt="0.0.0.0/0 policy route" style={{ width: '100%', display: 'block' }} />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
        0.0.0.0/0 policy route — all traffic tunnelled over Network Extension · Source: Microsoft Learn · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>

      <div style={calloutInfo}>
        <strong>Worth noting:</strong> Policy routes are only evaluated if the VM gateway has been migrated to the cloud side. If the gateway is still on-premises, policy routes have no effect. In general, the Microsoft recommendation is to remove all default policy routes and only add them back once your infrastructure has been specifically configured to prevent asymmetric traffic.
      </div>

      <h2 style={h2}>Wrapping Up</h2>
      <p style={p}>
        If you&apos;re planning to use HCX for a phased migration, getting your head around NE and MON early will save you a lot of pain. The technology is solid but the sequencing, HA configuration, and BGP routing behaviour are exactly the kind of things that don&apos;t show up until you&apos;re in the middle of a cutover window.
      </p>
      <p style={p}>
        Test everything. Enable HA first. And run that network cutover dry-run before you commit to production.
      </p>

      <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(0,98,245,0.08)', border: '1px solid rgba(0,98,245,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>👉</span>
        <p style={{ margin: 0, color: '#60a5fa', fontWeight: 600, fontSize: '0.95rem' }}>Coming next: HCX migration types — RAV, Bulk, vMotion, and when to use each one.</p>
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
