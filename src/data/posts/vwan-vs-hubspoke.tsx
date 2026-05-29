export default function VwanVsHubSpokeContent() {
  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      <h2 style={h2}>Why This Matters in 2026</h2>
      <p style={p}>Azure estates have grown. Multi-region is now the norm for anything customer-facing. SD-WAN rollouts have pushed branch connectivity up the agenda. Azure Firewall is in almost every design. And platform teams are being asked to do more with the same headcount, which means the question of how much networking complexity you own versus what you hand to Microsoft has real business weight behind it.</p>

      <Callout type="info">
        The answer is still &quot;it depends&quot; but there are clear signals pointing one way or the other. That&apos;s what this post works through.
      </Callout>

      <h2 style={h2}>What is Azure Hub &amp; Spoke?</h2>
      <p style={p}>The concept is simple. A central hub VNet acts as the transit and shared services network. Spokes connect via VNet peering and host your workloads. Everything shared lives in the hub: Azure Firewall or an NVA, ExpressRoute and VPN gateways, DNS, Bastion, whatever your organisation treats as central infrastructure. All traffic between spokes, and all traffic to on-premises, flows through the hub.</p>
      <p style={p}>It&apos;s the pattern that maps well to how most networking teams think. Central perimeter, shared services, controlled egress. It fits neatly with the CAF landing zone model. Network engineers who&apos;ve come from on-premises backgrounds find it familiar. And because you own the route tables, you can do whatever you need with traffic flows.</p>

      <TwoCol
        strengths={['Complete control over routing', 'Works with any NVA or firewall', 'Highly customisable', 'Familiar to network engineers', 'Maps naturally to landing zone governance', 'Predictable cost at small/medium scale', 'Aligns well with CAF landing zones']}
        tradeoffs={['Operational overhead grows with scale', 'VNet peering sprawl at 50+ VNets', 'Multi-region routing complexity', '30-60 min config per new VNet', 'Manual UDR management across spokes', 'Inter-hub peering requires care']}
      />

      <p style={p}>Hub and spoke is not a legacy pattern. It&apos;s well understood, well documented, and works reliably. The issue is that it has a ceiling. A lot of organisations don&apos;t notice they&apos;ve hit it until they&apos;re already dealing with the consequences: sprawling peering configurations, route tables that take half a day to reason through, and networking tickets that back up every time a new team wants a VNet.</p>

      <h2 style={h2}>What is Azure Virtual WAN?</h2>
      <p style={p}>Virtual WAN is Microsoft&apos;s managed networking service. Instead of building and running your own hub VNets, you deploy Virtual Hubs. Microsoft manages the hub infrastructure, the routing engine, and the backbone connectivity between hubs in different regions. You connect things to it: branches via VPN or SD-WAN, VNets via peering, on-premises via ExpressRoute.</p>
      <p style={p}>The practical difference from hub-spoke is straightforward. In hub-spoke, you own the route tables. You decide how traffic flows, you update UDRs when things change, and you manage gateway capacity. In vWAN, the platform handles routing propagation automatically. Connect a VNet to a hub and its address space is learned by the hub router. No manual UDR update required. That sounds small. At 10 VNets it is small. At 80 VNets across three regions, it&apos;s a significant operational difference.</p>

      <TwoCol
        strengths={['Automated routing at scale', 'Global transit via Microsoft backbone', 'Native SD-WAN partner integrations', 'Branch connectivity is first-class', '50th VNet = same effort as the 1st', 'Real operational simplicity at scale']}
        tradeoffs={['Less architectural flexibility', 'NVA clustering constraints', 'Cost model is less intuitive', 'Data processing fees can surprise', 'Not justified for smaller estates', 'Steeper learning curve initially']}
      />

      <h2 style={h2}>Architecture Diagrams</h2>

      <h3 style={h3}>Diagram 1: Hub &amp; Spoke (UK South &amp; UK West)</h3>
      <div style={diagramWrap}>
        <p style={diagramLabel}>Hub &amp; Spoke: UK South &amp; UK West</p>
        <svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block', maxWidth: '760px', margin: '0 auto' }}>
          <defs>
            <marker id="hs-a" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={5} markerHeight={5} orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#3a5a7f" /></marker>
            <marker id="hs-ab" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={5} markerHeight={5} orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0062f5" /></marker>
            <marker id="hs-ab-r" viewBox="0 0 8 8" refX={1} refY={4} markerWidth={5} markerHeight={5} orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" fill="#0062f5" /></marker>
          </defs>
          <rect x={10} y={190} width={115} height={52} rx={8} fill="#041526" stroke="rgba(0,120,212,0.4)" strokeWidth={1.5} />
          <text x={67} y={211} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fontWeight={600} fill="#e8edf5">🏢 On-Premises</text>
          <text x={67} y={230} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={10} fill="#5a7a9f">ExpressRoute</text>
          <path d="M 125 216 L 148 216 L 148 82 L 170 82" stroke="#3a5a7f" strokeWidth={1.5} fill="none" strokeDasharray="5,3" markerEnd="url(#hs-a)" />
          <rect x={143} y={15} width={257} height={405} rx={12} fill="rgba(0,98,245,0.03)" stroke="#0062f5" strokeWidth={1.5} strokeDasharray="7,3" />
          <text x={271} y={34} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={10} fontWeight={500} letterSpacing={2} fill="#76afff">UK SOUTH</text>
          <rect x={158} y={44} width={227} height={162} rx={8} fill="rgba(0,98,245,0.07)" stroke="rgba(0,98,245,0.4)" strokeWidth={1} />
          <text x={271} y={59} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} letterSpacing={2} fill="#5a7a9f">HUB VNET</text>
          <rect x={170} y={64} width={203} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.3)" strokeWidth={1} />
          <text x={271} y={87} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#c8d6ea">ER / VPN Gateway</text>
          <rect x={170} y={108} width={203} height={36} rx={6} fill="rgba(0,98,245,0.18)" stroke="#0062f5" strokeWidth={1.5} />
          <text x={271} y={131} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fontWeight={600} fill="#76afff">Azure Firewall</text>
          <rect x={170} y={152} width={203} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.25)" strokeWidth={1} />
          <text x={271} y={175} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#c8d6ea">DNS / Shared Services</text>
          <line x1={271} y1={206} x2={271} y2={222} stroke="#3a5a7f" strokeWidth={1.5} markerEnd="url(#hs-a)" />
          <rect x={158} y={222} width={227} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={271} y={245} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#7a9abf">Spoke: App Workload</text>
          <line x1={271} y1={258} x2={271} y2={270} stroke="#3a5a7f" strokeWidth={1} strokeDasharray="3,2" />
          <rect x={158} y={270} width={227} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={271} y={293} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#7a9abf">Spoke: Data Platform</text>
          <line x1={271} y1={306} x2={271} y2={318} stroke="#3a5a7f" strokeWidth={1} strokeDasharray="3,2" />
          <rect x={158} y={318} width={227} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={271} y={341} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#7a9abf">Spoke: Dev / Test</text>
          <text x={422} y={116} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} letterSpacing={1} fill="#5a7a9f">HUB PEERING</text>
          <line x1={385} y1={126} x2={459} y2={126} stroke="#0062f5" strokeWidth={1.5} markerStart="url(#hs-ab-r)" markerEnd="url(#hs-ab)" />
          <rect x={444} y={15} width={235} height={355} rx={12} fill="rgba(0,98,245,0.02)" stroke="rgba(0,98,245,0.55)" strokeWidth={1.5} strokeDasharray="7,3" />
          <text x={549} y={34} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={10} fontWeight={500} letterSpacing={2} fill="#5a7a9f">UK WEST</text>
          <rect x={635} y={21} width={28} height={16} rx={4} fill="rgba(0,98,245,0.15)" stroke="rgba(0,98,245,0.3)" strokeWidth={1} />
          <text x={649} y={33} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={8} fill="#5a7a9f">DR</text>
          <rect x={459} y={44} width={205} height={120} rx={8} fill="rgba(0,98,245,0.04)" stroke="rgba(0,98,245,0.3)" strokeWidth={1} />
          <text x={561} y={59} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} letterSpacing={2} fill="#5a7a9f">HUB VNET</text>
          <rect x={472} y={64} width={178} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.3)" strokeWidth={1} />
          <text x={561} y={87} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#c8d6ea">VPN Gateway</text>
          <rect x={472} y={108} width={178} height={36} rx={6} fill="rgba(0,98,245,0.18)" stroke="#0062f5" strokeWidth={1.5} />
          <text x={561} y={131} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fontWeight={600} fill="#76afff">Azure Firewall</text>
          <line x1={561} y1={164} x2={561} y2={180} stroke="#3a5a7f" strokeWidth={1.5} markerEnd="url(#hs-a)" />
          <rect x={459} y={180} width={205} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={561} y={203} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#7a9abf">Spoke: App Workload</text>
          <line x1={561} y1={216} x2={561} y2={228} stroke="#3a5a7f" strokeWidth={1} strokeDasharray="3,2" />
          <rect x={459} y={228} width={205} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={561} y={251} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#7a9abf">Spoke: DR / Failover</text>
        </svg>
      </div>

      <h3 style={h3}>Diagram 2: Azure Virtual WAN (UK South &amp; UK West)</h3>
      <div style={diagramWrap}>
        <p style={diagramLabel}>Azure Virtual WAN: UK South &amp; UK West</p>
        <svg viewBox="0 0 760 390" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block', maxWidth: '760px', margin: '0 auto' }}>
          <defs>
            <marker id="vw-a" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={5} markerHeight={5} orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#3a5a7f" /></marker>
            <marker id="vw-ab" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={5} markerHeight={5} orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0062f5" /></marker>
            <marker id="vw-ab-r" viewBox="0 0 8 8" refX={1} refY={4} markerWidth={5} markerHeight={5} orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" fill="#0062f5" /></marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={3} result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect x={18} y={16} width={108} height={42} rx={8} fill="#020d1a" stroke="rgba(0,120,212,0.35)" strokeWidth={1.5} />
          <text x={72} y={33} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fontWeight={600} fill="#c8d6ea">Branch (VPN)</text>
          <text x={72} y={50} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} fill="#5a7a9f">Site-to-Site</text>
          <rect x={142} y={16} width={118} height={42} rx={8} fill="#020d1a" stroke="rgba(0,120,212,0.35)" strokeWidth={1.5} />
          <text x={201} y={33} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fontWeight={600} fill="#c8d6ea">Branch (SD-WAN)</text>
          <text x={201} y={50} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} fill="#5a7a9f">Partner NVA</text>
          <rect x={278} y={16} width={120} height={42} rx={8} fill="#020d1a" stroke="rgba(0,120,212,0.35)" strokeWidth={1.5} />
          <text x={338} y={33} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fontWeight={600} fill="#c8d6ea">🏢 On-Premises</text>
          <text x={338} y={50} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} fill="#5a7a9f">ExpressRoute</text>
          <line x1={72} y1={58} x2={72} y2={148} stroke="#3a5a7f" strokeWidth={1.5} strokeDasharray="5,3" markerEnd="url(#vw-a)" />
          <line x1={201} y1={58} x2={201} y2={148} stroke="#3a5a7f" strokeWidth={1.5} strokeDasharray="5,3" markerEnd="url(#vw-a)" />
          <line x1={338} y1={58} x2={338} y2={148} stroke="#3a5a7f" strokeWidth={1.5} strokeDasharray="5,3" markerEnd="url(#vw-a)" />
          <rect x={10} y={86} width={740} height={176} rx={14} fill="rgba(0,98,245,0.03)" stroke="#0062f5" strokeWidth={1.5} strokeDasharray="8,4" />
          <text x={380} y={103} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={10} fontWeight={500} letterSpacing={2} fill="#76afff">AZURE VIRTUAL WAN</text>
          <rect x={24} y={110} width={318} height={134} rx={8} fill="rgba(0,98,245,0.06)" stroke="rgba(0,98,245,0.4)" strokeWidth={1} />
          <text x={183} y={126} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} letterSpacing={2} fill="#76afff">UK SOUTH</text>
          <rect x={38} y={132} width={290} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.3)" strokeWidth={1} />
          <text x={183} y={155} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#c8d6ea">vWAN Hub Router</text>
          <rect x={38} y={176} width={290} height={36} rx={6} fill="rgba(0,98,245,0.18)" stroke="#0062f5" strokeWidth={1.5} />
          <text x={183} y={199} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fontWeight={600} fill="#76afff">Azure Firewall</text>
          <line x1={342} y1={155} x2={418} y2={155} stroke="rgba(0,98,245,0.2)" strokeWidth={6} filter="url(#glow)" />
          <line x1={342} y1={155} x2={418} y2={155} stroke="#0062f5" strokeWidth={2} markerStart="url(#vw-ab-r)" markerEnd="url(#vw-ab)" />
          <text x={380} y={146} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={8} letterSpacing={0.5} fill="#76afff">MICROSOFT</text>
          <text x={380} y={170} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={8} letterSpacing={0.5} fill="#76afff">BACKBONE</text>
          <rect x={418} y={110} width={318} height={134} rx={8} fill="rgba(0,98,245,0.04)" stroke="rgba(0,98,245,0.3)" strokeWidth={1} />
          <text x={577} y={126} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize={9} letterSpacing={2} fill="#5a7a9f">UK WEST</text>
          <rect x={432} y={132} width={290} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.3)" strokeWidth={1} />
          <text x={577} y={155} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fill="#c8d6ea">vWAN Hub Router</text>
          <rect x={432} y={176} width={290} height={36} rx={6} fill="rgba(0,98,245,0.18)" stroke="#0062f5" strokeWidth={1.5} />
          <text x={577} y={199} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={12} fontWeight={600} fill="#76afff">Azure Firewall</text>
          <line x1={183} y1={244} x2={183} y2={268} stroke="#3a5a7f" strokeWidth={1.5} />
          <line x1={183} y1={268} x2={90} y2={268} stroke="#3a5a7f" strokeWidth={1} />
          <line x1={183} y1={268} x2={276} y2={268} stroke="#3a5a7f" strokeWidth={1} />
          <line x1={90} y1={268} x2={90} y2={282} stroke="#3a5a7f" strokeWidth={1} markerEnd="url(#vw-a)" />
          <line x1={276} y1={268} x2={276} y2={282} stroke="#3a5a7f" strokeWidth={1} markerEnd="url(#vw-a)" />
          <rect x={24} y={282} width={133} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={90} y={305} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fill="#7a9abf">Spoke: App VNet</text>
          <rect x={209} y={282} width={133} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={276} y={305} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fill="#7a9abf">Spoke: Data VNet</text>
          <line x1={577} y1={244} x2={577} y2={268} stroke="#3a5a7f" strokeWidth={1.5} />
          <line x1={577} y1={268} x2={484} y2={268} stroke="#3a5a7f" strokeWidth={1} />
          <line x1={577} y1={268} x2={670} y2={268} stroke="#3a5a7f" strokeWidth={1} />
          <line x1={484} y1={268} x2={484} y2={282} stroke="#3a5a7f" strokeWidth={1} markerEnd="url(#vw-a)" />
          <line x1={670} y1={268} x2={670} y2={282} stroke="#3a5a7f" strokeWidth={1} markerEnd="url(#vw-a)" />
          <rect x={418} y={282} width={133} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={484} y={305} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fill="#7a9abf">Spoke: App VNet</text>
          <rect x={603} y={282} width={133} height={36} rx={6} fill="#020d1a" stroke="rgba(0,120,212,0.2)" strokeWidth={1} />
          <text x={670} y={305} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize={11} fill="#7a9abf">Spoke: DR VNet</text>
        </svg>
      </div>

      <h2 style={h2}>Feature Comparison</h2>
      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', background: 'var(--surface-card)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
          <thead>
            <tr style={{ background: 'rgba(0,98,245,0.15)' }}>
              {['Capability', 'Hub & Spoke', 'Azure Virtual WAN'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-mono)', padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Global scale', 'Manual inter-hub peering', 'Built-in via Microsoft backbone'],
              ['Multi-region connectivity', 'Complex, manual route design', 'Native, automatic between hubs'],
              ['Branch connectivity', 'VPN/ER gateways in hub', 'Native VPN, ER, SD-WAN'],
              ['ExpressRoute', 'Via ER gateway', 'Supported. Global Reach often unnecessary'],
              ['VPN (Site-to-Site)', 'Via VPN gateway', 'Scales to 1000s of branches'],
              ['Azure Firewall', 'Deployed in hub VNet', 'Secured Virtual Hub (native)'],
              ['Third-party NVAs', 'Full support', 'Supported, with constraints'],
              ['SD-WAN integration', 'Manual, via NVA', 'Native partner integrations'],
              ['Operational complexity', 'High at scale', 'Lower at scale'],
              ['Governance', 'Fully customisable', 'Platform-enforced guardrails'],
              ['Flexibility / customisation', 'Very high', 'Moderate'],
              ['Time to deploy', 'Faster (small estates)', 'Faster at scale'],
              ['Cost predictability', 'Predictable at small/medium scale', 'Less intuitive, model carefully'],
              ['Best fit', 'Small to large (up to ~50 VNets)', 'Large enterprise, global, branch-heavy'],
            ].map(([cap, hs, vwan], i) => (
              <tr key={cap} style={{ borderBottom: '1px solid var(--border-card)', background: i % 2 === 1 ? 'rgba(0,98,245,0.02)' : 'transparent' }}>
                <td style={{ padding: '11px 16px', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '13px' }}>{cap}</td>
                <td style={{ padding: '11px 16px', color: 'var(--text-muted)' }}>{hs}</td>
                <td style={{ padding: '11px 16px', color: 'var(--text-muted)' }}>{vwan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2}>When Hub &amp; Spoke is the Better Choice</h2>

      <UseCase title="Single-region or small multi-region estates">
        One or two regions, a sensible number of VNets, stable traffic patterns. Hub-spoke fits this well and typically costs less. vWAN&apos;s ~£136/month fixed hub fee (per region) exists whether you&apos;re passing 1GB of traffic or 1TB through it. Add a VPN scale unit at ~£196/month and you&apos;re already paying more than a hub-spoke equivalent before any data flows. At low scale the operational savings from vWAN don&apos;t come close to covering that difference.
      </UseCase>

      <UseCase title="Non-standard routing requirements">
        Hub-spoke lets you do what you need with route tables. If you have inspection requirements that don&apos;t follow a clean hub-and-spoke flow, or traffic that needs to take unusual paths for compliance or legacy reasons, custom UDRs give you that control. vWAN&apos;s routing model is opinionated. That&apos;s fine when your requirements align with it. When they don&apos;t, the workarounds get messy.
      </UseCase>

      <UseCase title="Heavy NVA usage with clustering or HA requirements">
        This is a specific area where vWAN can catch teams out. Not every NVA architecture is compatible with the way vWAN handles routing. If you&apos;re running active-active NVA clusters with specific failover behaviour, check carefully before assuming vWAN will support it. Some vendors work well. Others require architecture changes you may not want to make.
      </UseCase>

      <UseCase title="You have an existing landing zone that's working">
        This comes up a lot in brownfield reviews. The team has invested time in building a governed hub-spoke landing zone, it&apos;s running well, and someone in a design workshop suggests moving to vWAN. The question to ask is: what&apos;s the actual problem you&apos;re solving? If the answer is &quot;nothing specific, vWAN is more modern&quot;, that&apos;s not a good enough reason. Migration has real cost and risk. Don&apos;t do it without a clear rationale.
      </UseCase>

      <UseCase title="Budget is tight and traffic is predictable">
        Hub-spoke costs are easier to model. Gateway charges, peering costs, firewall SKU. If you know your traffic volumes and patterns, you can forecast reasonably accurately. vWAN billing is harder to reason about upfront, particularly if you have spoke-to-spoke or inter-region traffic. When budget predictability matters, hub-spoke is the safer choice.
      </UseCase>

      <h2 style={h2}>When Azure Virtual WAN is the Better Choice</h2>

      <UseCase title="Multiple Azure regions with inter-region traffic">
        Managing inter-region connectivity in a custom hub-spoke setup requires inter-hub VNet peering, careful route propagation between regions, and ongoing maintenance every time something changes. It works, but it&apos;s manual and it accumulates technical debt. vWAN handles regional transit natively. The hubs route to each other automatically over Microsoft&apos;s backbone. That alone is a meaningful time saving in a four-region estate.
      </UseCase>

      <UseCase title="Lots of branch sites connecting to Azure">
        If you have 50 branches coming in via VPN, or you&apos;re rolling out an SD-WAN overlay and want Azure to be one of the connectivity endpoints, vWAN is the right fit. The SD-WAN partner integrations with vendors like Barracuda, Check Point, and Fortinet are mature. Onboarding a new branch site doesn&apos;t require a networking engineer to manually configure a tunnel and update route tables. That matters when you&apos;re dealing with volume.
      </UseCase>

      <UseCase title="Large VNet counts with high spoke-to-spoke traffic">
        The per-GB data cost for spoke-to-spoke traffic is similar in both models (roughly £0.030/GB when you include peering charges on both sides). What changes at scale is the management overhead, not necessarily the raw platform bill. The per-VNet configuration time in hub-spoke (typically 30 to 60 minutes including firewall rules, DNS, UDRs) adds up to real engineering hours. Whether that justifies vWAN&apos;s fixed hub costs depends on your team&apos;s bandwidth and the volume of VNet onboarding you&apos;re doing.
      </UseCase>

      <UseCase title="A central platform team supporting many product teams">
        If a small platform team is responsible for network connectivity across 30 application teams, the routing automation in vWAN genuinely changes the workload. A new team requests a VNet, it gets connected to the hub, routing propagates automatically. Compare that to the hub-spoke equivalent where someone needs to create the peering, add the UDR, check the firewall policy, update DNS. None of those steps are hard. But collectively, across many teams, they consume disproportionate time.
      </UseCase>

      <UseCase title="SD-WAN is part of your wider network strategy">
        If your WAN team is deploying SD-WAN and cloud connectivity is on the roadmap, vWAN integrates with the major SD-WAN vendors in a way that&apos;s hard to replicate cleanly in hub-spoke. You get a consistent connectivity model from branch to Azure rather than a custom VPN setup bolted onto the side of your hub.
      </UseCase>

      <h2 style={h2}>Cost Considerations</h2>

      <p style={p}>Cost is where this decision gets complicated. Anyone who gives you precise annual totals comparing the two without knowing your traffic patterns, branch count, and gateway requirements is guessing. What I can give you are the actual Microsoft unit prices and the cost model logic, which is more useful than a fabricated comparison table.</p>

      <p style={p}>All figures below are from Microsoft&apos;s <a href="https://learn.microsoft.com/en-us/azure/virtual-wan/pricing-concepts" target="_blank" rel="noopener noreferrer" style={link}>Virtual WAN pricing documentation</a> (updated January 2026), converted to GBP at the May 2026 rate of £0.74 per $1. Azure publishes separate local currency pricing, so always check the <a href="https://azure.microsoft.com/en-gb/pricing/details/virtual-wan/" target="_blank" rel="noopener noreferrer" style={link}>Azure pricing page</a> for current GBP rates before modelling.</p>

      <div style={{ overflowX: 'auto', margin: '20px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr>
              {['Component', 'Hub & Spoke', 'Azure Virtual WAN'].map(h => (
                <th key={h} style={{ background: 'rgba(0,98,245,0.18)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent-light)', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid var(--border-card)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Hub fixed cost', 'No hub fee (you own the VNet)', '~£0.19/hr per hub (~£136/month)'],
              ['VPN gateway (500 Mbps)', 'VpnGw1: ~£0.14/hr (~£103/month)', '1 S2S scale unit: ~£0.27/hr (~£196/month)'],
              ['Per branch connection', 'Included in gateway SKU', '~£0.04/hr per branch (~£27/month)'],
              ['ExpressRoute gateway (2 Gbps)', 'UltraPerformance: ~£0.51/hr', '1 ER scale unit: ~£0.31/hr (~£228/month)'],
              ['Per ER circuit connection', 'Included in gateway', '~£0.04/hr per circuit (~£27/month)'],
              ['Spoke-to-spoke (same region)', '~£0.007/GB x4 (both sides of both peerings) = ~£0.030/GB', '~£0.007/GB x2 (peering) + ~£0.015/GB (hub processing) = ~£0.030/GB'],
              ['Spoke-to-branch (same hub)', '~£0.007/GB peering + outbound bandwidth', '~£0.007/GB peering only. No hub processing charge'],
              ['Inter-region hub-to-hub', 'Global VNet Peering at both ends + inter-region bandwidth', '~£0.015/GB hub processing per hub + inter-region bandwidth charges'],
            ].map(([comp, hs, vwan]) => (
              <tr key={comp} style={{ borderBottom: '1px solid var(--border-card)' }}>
                <td style={{ padding: '10px 14px', color: 'var(--text-muted)', background: 'var(--surface-card)', fontWeight: 500 }}>{comp}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-muted)', background: 'var(--surface-card)' }}>{hs}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-muted)', background: 'var(--surface-card)' }}>{vwan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={mono}>Source: <a href="https://learn.microsoft.com/en-us/azure/virtual-wan/pricing-concepts" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-subtle)' }}>Microsoft Learn: About Virtual WAN pricing</a>, updated January 2026. Converted from USD at £0.74/$1 (May 2026). Verify current GBP rates directly on Azure pricing pages.</p>

      <h3 style={h3}>What This Looks Like at Different Scales</h3>

      <p style={p}>These scenarios include both Azure infrastructure costs and engineering time, modelled at £50/hr. On raw Azure infrastructure alone, hub-spoke is cheaper at every scale. Engineering time is what shifts the comparison at scale. It&apos;s the number most teams leave out of their cost model.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '24px 0' }}>
        <ScenarioCard
          label="10 VNets"
          accentColor="#10b981"
          description="Single/dual region. Light branch connectivity. Firewall Standard. No management overhead at this scale."
          hsTotal="£13,440" hsDetail="Peering + Firewall Standard + ER Gateway + data"
          vwTotal="£23,700" vwDetail="Hubs + VNet connections + Secured Hub + ER Gateway + data"
          verdict="Hub & Spoke saves ~£10,260/yr. vWAN overhead not justified at this scale."
          verdictBg="rgba(16,185,129,0.08)" verdictBorder="rgba(16,185,129,0.2)" verdictColor="#10b981"
          hsTotalColor="#10b981" vwTotalColor="#f59e0b"
        />
        <ScenarioCard
          label="50 VNets"
          accentColor="#0062f5"
          description="3 regions. 10 branches. Firewall Premium. ~10TB/month. Hub-spoke: 40 hrs/month engineering. vWAN: 10 hrs/month."
          hsTotal="£92,400" hsDetail="Infra + 40 hrs/month engineering at £50/hr"
          vwTotal="£79,380" vwDetail="Infra + 10 hrs/month engineering at £50/hr"
          verdict="Crossover point. vWAN saves ~£13,000/yr. Engineering time is the deciding factor. Azure infra alone still favours hub-spoke."
          verdictBg="rgba(0,98,245,0.08)" verdictBorder="rgba(0,98,245,0.2)" verdictColor="var(--accent-light)"
          hsTotalColor="#f59e0b" vwTotalColor="#10b981"
        />
        <ScenarioCard
          label="200+ VNets"
          accentColor="#7c3aed"
          description="5 regions. 50 branches. Firewall Premium. ~50TB/month. Hub-spoke: 160 hrs/month. vWAN: 40 hrs/month."
          hsTotal="£260,160" hsDetail="Infra + 160 hrs/month engineering at £50/hr"
          vwTotal="£205,860" vwDetail="Infra + 40 hrs/month engineering at £50/hr"
          verdict="vWAN saves ~£54,300/yr (21%). Engineering time accounts for ~£72,000 of the hub-spoke total."
          verdictBg="rgba(124,58,237,0.08)" verdictBorder="rgba(124,58,237,0.25)" verdictColor="#a78bfa"
          hsTotalColor="#f59e0b" vwTotalColor="#10b981"
        />
      </div>

      <p style={mono}>Azure infrastructure + engineering time at £50/hr. Assumes Firewall Premium, ~10TB/month at 50 VNets, ~50TB/month at 200+ VNets, 3-5 regions. Engineering hours are the biggest variable. If your team runs leaner or your rate differs, the crossover point shifts. Treat as directional.</p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>The hub deployment fee is vWAN&apos;s base overhead.</strong> Every Standard vWAN hub costs ~£0.19/hr whether it&apos;s passing traffic or not. That&apos;s roughly £136/month per region before you add gateways or process any data. Hub-spoke has no equivalent fixed charge. For a small single-region deployment with light branch connectivity, this difference alone is the main cost driver.</p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>Spoke-to-spoke variable costs are the same in both models.</strong> This surprises people. In hub-spoke, spoke-to-spoke traffic crosses two peering connections (both sides of each), totalling ~£0.030/GB. In vWAN, you pay ~£0.015/GB hub data processing plus ~£0.015/GB peering, also ~£0.030/GB. The per-GB cost is identical. What differs is the fixed infrastructure cost underneath it.</p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>Branch connectivity is where the cost structures diverge most visibly.</strong> A single-branch VPN in hub-spoke (VpnGw1) costs around £103/month. The equivalent vWAN S2S scale unit costs ~£196/month plus ~£27/month per branch connection. For one or two branches, hub-spoke is clearly cheaper on the Azure bill. For 50 branches, vWAN&apos;s per-connection model becomes more competitive, and the operational overhead of managing individual VPN configurations at that volume in hub-spoke is significant.</p>

      <p style={p}><strong style={{ color: 'var(--text-secondary)' }}>Inter-region traffic adds up in both models.</strong> Sending data between UK South and UK West triggers inter-region bandwidth charges regardless of topology. In vWAN, you additionally pay ~£0.015/GB hub data processing at each hub the traffic crosses. That makes high-volume cross-region spoke-to-spoke traffic noticeably more expensive in vWAN than a direct Global VNet Peering connection between hubs.</p>

      <Callout type="warn">
        vWAN inter-region spoke-to-spoke incurs ~£0.015/GB hub processing per hub crossed, on top of standard inter-region bandwidth charges. At high east-west volumes between UK South and UK West, model this before you commit.
      </Callout>

      <h2 style={h2}>Common Mistakes</h2>

      <Mistake n="01" title="Picking vWAN because it feels like the right direction">
        &quot;We should be on vWAN, it&apos;s what Microsoft is investing in&quot; is something I hear regularly. It&apos;s not a bad observation, but it&apos;s not an architecture decision either. vWAN suits specific situations well. In others, you&apos;re paying more for a platform that constrains you without giving anything back. Start with your requirements, not with the product.
      </Mistake>

      <Mistake n="02" title="Staying on hub-spoke when the estate has outgrown it">
        The opposite is just as common and probably more costly. A team running five regions and 120 VNets through a hub-spoke topology they designed three years ago for a quarter of that scale. The signs are usually visible: peering configurations no one fully understands, routing changes that take days to implement safely, network engineers who spend most of their time on connectivity tickets rather than anything strategic.
      </Mistake>

      <Mistake n="03" title="Leaving engineering time out of the cost comparison">
        A spreadsheet comparing Azure resource costs between hub-spoke and vWAN is a starting point, not the answer. If your team is spending 20 hours a month managing routing configuration in a large hub-spoke setup, that&apos;s real cost. It just doesn&apos;t appear on the Azure bill. Factor it in honestly.
      </Mistake>

      <Mistake n="04" title="Designing for day one, not year three">
        Hub-spoke routing is simple when you set it up. It gets complicated incrementally, and the complexity rarely announces itself until it&apos;s already accumulated. Each new region, each workload with unusual routing requirements, each shared service that needs to be reachable from multiple spokes adds a little more. Model what the architecture looks like at 2x or 3x your current scale before committing.
      </Mistake>

      <Mistake n="05" title="Not modelling vWAN data processing costs properly">
        The virtual hub data processing charge (~£0.015/GB per hub crossed) is easy to miss when scoping a vWAN design. If you have significant inter-region traffic between UK South and UK West, it adds up. I&apos;ve seen it come as a genuine surprise post-deployment. Price it before you commit.
      </Mistake>

      <Mistake n="06" title="Treating 'gradual migration' as a strategy">
        Running hub-spoke and vWAN in parallel for longer than necessary creates a networking topology that is harder to reason about than either option on its own. If you&apos;re moving to vWAN, define the target state clearly and migrate to it. Don&apos;t let the transition become the steady state.
      </Mistake>

      <h2 style={h2}>Final Thoughts</h2>

      <p style={p}>Neither of these is the wrong answer in absolute terms. Hub-spoke is not outdated. vWAN is not automatically better. They&apos;re different tools with different strengths, and the choice genuinely depends on your specific situation.</p>

      <p style={p}>If you&apos;re in one or two regions with a manageable VNet count and a team comfortable running network configuration, hub-spoke is probably the right call. Keep it well governed, consider Azure Virtual Network Manager to reduce the manual overhead, and revisit the topology decision as you grow.</p>

      <p style={p}>If you&apos;re running multiple regions, connecting branches at scale, or managing a large number of VNets with a small platform team, the case for vWAN is real. The routing automation and the inter-region transit are genuinely useful at that scale, and the cost position improves as the estate grows.</p>

      <p style={p}>The mistake most teams make isn&apos;t picking the wrong pattern initially. It&apos;s not going back to question the decision as the environment evolves. The architecture that was right for 15 VNets in a single region is often not the right architecture for 100 VNets across four regions and 40 branch sites. Treat the networking topology as something to review periodically, not something you set once and leave.</p>

    </div>
  )
}

function TwoCol({ strengths, tradeoffs }: { strengths: string[]; tradeoffs: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0 28px' }}>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderTop: '2px solid #10b981', borderRadius: '10px', padding: '18px 20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#10b981', marginBottom: '12px' }}>✓ Strengths</div>
        <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
          {strengths.map(s => <li key={s} style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '5px' }}>{s}</li>)}
        </ul>
      </div>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderTop: '2px solid #f59e0b', borderRadius: '10px', padding: '18px 20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#f59e0b', marginBottom: '12px' }}>⚠ Trade-offs</div>
        <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
          {tradeoffs.map(t => <li key={t} style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '5px' }}>{t}</li>)}
        </ul>
      </div>
    </div>
  )
}

function UseCase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '20px 22px', margin: '14px 0' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{title}</div>
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{children}</p>
    </div>
  )
}

function Callout({ type, children }: { type: 'info' | 'warn'; children: React.ReactNode }) {
  const isWarn = type === 'warn'
  return (
    <div style={{ borderLeft: `4px solid ${isWarn ? '#f59e0b' : '#0062f5'}`, background: isWarn ? 'rgba(245,158,11,0.07)' : 'rgba(0,98,245,0.08)', padding: '14px 18px', margin: '24px 0', borderRadius: '0 8px 8px 0' }}>
      <p style={{ margin: 0, fontSize: '15px', color: isWarn ? '#d4a855' : 'var(--text-secondary)' }}>{children}</p>
    </div>
  )
}

function Mistake({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '14px', marginBottom: '22px', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: '#f87171', marginTop: '3px' }}>{n}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{title}</div>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{children}</p>
      </div>
    </div>
  )
}

function ScenarioCard({ label, accentColor, description, hsTotal, hsDetail, vwTotal, vwDetail, verdict, verdictBg, verdictBorder, verdictColor, hsTotalColor, vwTotalColor }: {
  label: string; accentColor: string; description: string;
  hsTotal: string; hsDetail: string; vwTotal: string; vwDetail: string;
  verdict: string; verdictBg: string; verdictBorder: string; verdictColor: string;
  hsTotalColor: string; vwTotalColor: string;
}) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderTop: `2px solid ${accentColor}`, borderRadius: '10px', padding: '18px 20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: accentColor, marginBottom: '10px' }}>{label}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>{description}</div>
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '3px' }}>Hub &amp; Spoke</div>
        <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: hsTotalColor }}>{hsTotal}<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-subtle)' }}>/yr</span></div>
        <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>{hsDetail}</div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '10px', marginTop: '4px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '3px' }}>Azure Virtual WAN</div>
        <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: vwTotalColor }}>{vwTotal}<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-subtle)' }}>/yr</span></div>
        <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>{vwDetail}</div>
      </div>
      <div style={{ background: verdictBg, border: `1px solid ${verdictBorder}`, borderRadius: '6px', padding: '8px 10px', marginTop: '12px', fontSize: '12px', color: verdictColor }}>{verdict}</div>
    </div>
  )
}

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  margin: '40px 0 16px',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--border-card)',
  letterSpacing: '-0.02em',
}

const h3: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  margin: '32px 0 12px',
  letterSpacing: '-0.01em',
}

const p: React.CSSProperties = { marginBottom: '16px' }

const mono: React.CSSProperties = {
  fontSize: '13px',
  fontFamily: 'var(--font-mono)',
  color: 'var(--text-subtle)',
  marginBottom: '16px',
}

const link: React.CSSProperties = {
  color: 'var(--accent-light)',
  textDecoration: 'none',
}

const diagramWrap: React.CSSProperties = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-card)',
  borderRadius: '12px',
  padding: '28px 20px',
  margin: '20px 0',
  overflowX: 'auto',
}

const diagramLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-subtle)',
  textAlign: 'center',
  marginBottom: '20px',
}
