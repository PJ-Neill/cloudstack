'use client'
import { useState, useEffect } from 'react'

const IMG = '/posts/azure-files-migration/'

export default function AzureFilesMigrationContent() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const zoom = (src: string, alt: string) => setLightbox({ src, alt })

  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.85 }}>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <img src={lightbox.src} alt={lightbox.alt} style={{ maxWidth: '92vw', maxHeight: '88vh', borderRadius: '10px', border: '1px solid var(--border-card)', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }} />
        </div>
      )}

      <p style={p}>Migrating to Azure Files but want to keep your existing share paths intact? You are not alone. Preserving share paths is one of the most overlooked parts of a file migration, and getting it wrong means a wave of support tickets the morning after cutover.</p>
      <p style={p}>There are plenty of good reasons to keep your paths as they are. Mapped drives embedded in login scripts and Group Policy would all need updating. Line of business applications that have share paths hardcoded in config files or databases can be painful to update. Users who have bookmarked network locations or saved paths in documents would lose access without warning. In regulated environments, documented UNC paths may even be referenced in audit trails or compliance documentation. The bottom line is that changing share paths is risky, time consuming, and often unnecessary if you plan the migration correctly.</p>

      <h2 style={h2}>DFS-N Root Consolidation</h2>

      <p style={p}>DFS Namespace Root Consolidation lets you completely preserve existing share paths when migrating file shares to Azure Files. Users and applications keep connecting to the same UNC paths they always have, with no client-side changes required.</p>
      <p style={p}>The idea is to build a DFS Namespace cluster on Azure VMs, then use root consolidation to make the DFS cluster respond to the old file server&apos;s name. Users and applications connecting to <code style={code}>\\oldfileserver\sharename</code> get transparently redirected to the Azure file share.</p>

      <Callout type="warn">
        <strong>All shares on the file server must be cut over at the same time.</strong> Because this approach works by updating DNS to point the old file server name to the Azure Load Balancer, it affects all shares on that server in one go. If <code style={code}>\\oldfileserver</code> hosts <code style={code}>\finance</code>, <code style={code}>\hr</code>, and <code style={code}>\projects</code>, all three need to be migrated to Azure Files and added as DFS folder targets before you update DNS. You cannot migrate shares one at a time and leave others on the old server. Plan your migration waves accordingly.
      </Callout>

      <p style={p}>Because DFS root consolidation is only supported on standalone DFS Namespaces, you&apos;ll need a Windows Server Failover Cluster built on two Azure VMs to back it. That means shared managed disks, a Windows cluster, an Azure Load Balancer, and some SPN manipulation. It&apos;s the right approach for environments where you can&apos;t afford any client-side changes.</p>

      <h3 style={h3}>Architecture Overview</h3>
      <p style={p}>The end state: two Azure VMs running Windows Server form a failover cluster. The cluster hosts a DFS Namespace role. The namespace uses root consolidation to accept connections using the old file server&apos;s name. An Azure Load Balancer handles the static IP for the cluster client access point, since Azure doesn&apos;t support Gratuitous ARP. DNS is updated to point the old server name at the load balancer&apos;s frontend IP. SPNs are moved from the old computer object to the DFS cluster. Azure Files sits at the other end as the actual storage target.</p>

      <Screenshot src={IMG + 'dfs-architecture.png'} alt="DFS root consolidation architecture diagram" caption="DFS Namespace root consolidation architecture — users connect to the old UNC path, DNS resolves to the Azure Load Balancer, which fronts the two-node DFS cluster, which refers traffic to Azure Files." onZoom={zoom} />

      <h2 style={h2}>Known Issue: WebDAV and the WebClient Service</h2>

      <p style={p}>Before you build anything, there is a known issue with DFS root consolidation and a legacy Windows service called WebDAV, listed in Windows Services as <strong>WebClient</strong>.</p>

      <Screenshot src={IMG + 'webclient-service.png'} alt="Windows Services showing the WebClient service set to Manual trigger start" caption="The WebClient service in Windows Services. When set to anything other than Disabled, it can cause significant performance issues with DFS root consolidation." onZoom={zoom} />

      <p style={p}>When the WebClient service is set to anything other than Disabled, some users experience very slow file and share open performance when connecting through DFS root consolidation. This is a well-documented interaction between the WebDAV protocol and DFS namespaces. Windows attempts a WebDAV negotiation before falling back to SMB, adding significant latency to every file open operation for affected users.</p>

      <Callout type="warn">
        <strong>Check the WebClient service on all client machines before going live.</strong> If it is set to Manual or Automatic, disable it. This is the most common cause of poor performance complaints after a DFS root consolidation migration and it is easy to miss.
      </Callout>

      <p style={p}>WebDAV itself is being phased out by most providers in favour of more secure and efficient alternatives. It is generally only used by legacy file sharing applications, and Microsoft has deprecated native WebDAV support. The WebClient service, which provides WebDAV support in Windows, is no longer enabled by default in modern Windows versions. If you find it running in your environment, it is likely a legacy dependency worth reviewing regardless of this migration.</p>

      <h2 style={h2}>Step-by-Step: Building the DFS Cluster</h2>

      <h3 style={h3}>Create the Quorum Shared Managed Disk</h3>
      <p style={p}>You&apos;ll need two VMs with no data disks to start. Create the first shared managed disk — the cluster quorum disk — with these parameters:</p>
      <p style={p}>Same region as your VMs. <code style={code}>CreateOption</code> as Empty. <code style={code}>MaxSharesCount</code> as 2. <code style={code}>DiskSizeGB</code> as 8GB. You only need it for quorum.</p>

      <Screenshot src={IMG + 'image1.png'} alt="Creating the quorum shared managed disk in Azure" caption="Creating the quorum shared managed disk" onZoom={zoom} />
      <Screenshot src={IMG + 'image2.png'} alt="Attaching the quorum disk to the first VM" caption="Attaching the quorum disk to both VMs" onZoom={zoom} />
      <Screenshot src={IMG + 'image3.png'} alt="Quorum disk attached to the second VM" caption="Quorum disk attached to both VMs" onZoom={zoom} />

      <p style={p}>On both servers, open Disk Management, initialise the disk (GPT), partition, format, and assign drive letter <strong>Q</strong> for Quorum. The cluster will handle disk ownership once it&apos;s set up.</p>
      <Screenshot src={IMG + 'image4.png'} alt="Disk Management initialising and formatting the quorum disk" caption="Initialising and formatting the quorum disk. Assign drive letter Q on both servers." onZoom={zoom} />

      <h3 style={h3}>Install Failover Clustering</h3>
      <p style={p}>On both DFS servers, open PowerShell as Administrator and run:</p>
      <CodeBlock label="PowerShell — both servers">{`Install-WindowsFeature -Name Failover-Clustering -IncludeManagementTools`}</CodeBlock>
      <Screenshot src={IMG + 'image5.png'} alt="Installing Failover Clustering feature via PowerShell" caption="Installing the Failover Clustering feature on both servers" onZoom={zoom} />

      <h3 style={h3}>Create the Windows Cluster</h3>
      <p style={p}>Once the feature is installed, open Administrative Tools and then Failover Cluster Manager on your first DFS server.</p>
      <Screenshot src={IMG + 'image6.png'} alt="Failover Cluster Manager open, ready to create cluster" caption="Failover Cluster Manager" onZoom={zoom} />
      <p style={p}>Add both DFS VMs to the cluster.</p>
      <Screenshot src={IMG + 'image7.png'} alt="Adding both DFS VMs to the cluster" caption="Adding both DFS VMs" onZoom={zoom} />
      <p style={p}>Run through Cluster Validation and make sure there are no significant warnings or errors. Give your cluster a name of 15 characters or less.</p>
      <Screenshot src={IMG + 'image8.png'} alt="Cluster validation results" caption="Cluster validation. Check for any significant errors before proceeding." onZoom={zoom} />
      <p style={p}>Create the cluster and verify it was created successfully.</p>
      <Screenshot src={IMG + 'image9.png'} alt="Cluster created successfully" caption="Cluster created successfully" onZoom={zoom} />
      <p style={p}>Ensure both nodes are up and available.</p>
      <Screenshot src={IMG + 'image10.png'} alt="Both cluster nodes showing as online" caption="Both nodes up and available" onZoom={zoom} />
      <p style={p}>Navigate to Storage and then Disks. Double-click the disk and rename it to <strong>Quorum Disk</strong>.</p>
      <Screenshot src={IMG + 'image11.png'} alt="Renaming the disk to Quorum Disk in Failover Cluster Manager" caption="Renaming the disk to Quorum Disk" onZoom={zoom} />

      <h3 style={h3}>Create the DFS Data Disk</h3>
      <p style={p}>Now create your second shared managed disk — the DFS Namespace data disk. Create this as a Premium SSD with these parameters:</p>
      <p style={p}>Same region as your VMs. <code style={code}>CreateOption</code> as Empty. <code style={code}>MaxSharesCount</code> as 2. <code style={code}>DiskSizeGB</code> as 256GB (P15).</p>
      <Screenshot src={IMG + 'image12.png'} alt="Creating the DFS Namespace data disk, Premium SSD P15" caption="Creating the DFS Namespace data disk, Premium SSD P15" onZoom={zoom} />
      <p style={p}>Attach the DFS data disk to both VMs the same way you did for the quorum disk.</p>
      <Screenshot src={IMG + 'image13.png'} alt="Attaching the DFS data disk to both VMs" caption="Attaching the DFS data disk to both VMs" onZoom={zoom} />
      <p style={p}>On both servers, open Disk Management, initialise, partition, format, and assign drive letter <strong>N</strong> for DFS Namespace.</p>
      <Screenshot src={IMG + 'image14.png'} alt="Disk Management, drive N initialised for DFS Namespace" caption="DFS Namespace disk initialised as drive N on both servers" onZoom={zoom} />

      <h3 style={h3}>Install the DFS Role</h3>
      <p style={p}>On both DFS servers, open PowerShell as Administrator and run:</p>
      <CodeBlock label="PowerShell — both servers">{`Install-WindowsFeature "FS-DFS-Namespace", "RSAT-DFS-Mgmt-Con"`}</CodeBlock>
      <p style={p}>Once installed, go to one of your cluster nodes, open Cluster Disks, and choose to add the new DFS data disk.</p>
      <Screenshot src={IMG + 'image15.png'} alt="Adding the DFS data disk to the cluster" caption="Adding the DFS data disk to the cluster" onZoom={zoom} />
      <p style={p}>Double-click the new disk and give it a name.</p>
      <Screenshot src={IMG + 'image16.png'} alt="Renaming the DFS data disk in Failover Cluster Manager" caption="Renaming the DFS data disk" onZoom={zoom} />

      <h3 style={h3}>Configure the DFS Role on the Cluster</h3>
      <p style={p}>In Failover Cluster Manager, right-click Roles and choose Configure Role.</p>
      <Screenshot src={IMG + 'image17.png'} alt="Configure Role option in Failover Cluster Manager" caption="Right-click Roles and choose Configure Role" onZoom={zoom} />
      <p style={p}>Give your DFS Client Access Point a name of 15 characters or less. This becomes the UNC name users connect to and the hostname used by DNS.</p>
      <Screenshot src={IMG + 'image18.png'} alt="Setting the DFS Client Access Point name" caption="Setting the DFS Client Access Point name. 15 characters or less." onZoom={zoom} />
      <p style={p}>Select the new cluster disk you made available to the cluster.</p>
      <Screenshot src={IMG + 'image19.png'} alt="Selecting the cluster disk for the DFS role" caption="Selecting the DFS data disk for the role" onZoom={zoom} />
      <p style={p}>Create your first namespace. Don&apos;t worry about the name, you&apos;ll delete it later. It&apos;s just required to complete the role setup.</p>
      <Screenshot src={IMG + 'image20.png'} alt="Creating a placeholder namespace during role setup" caption="Creating a placeholder namespace. This gets deleted later." onZoom={zoom} />
      <p style={p}>Complete the installation. The role will show as failed. That&apos;s expected. Two things still need sorting: a static IP and an Azure Load Balancer.</p>
      <Screenshot src={IMG + 'image21.png'} alt="DFS role in failed state, expected at this point" caption="DFS role in failed state. Static IP and Load Balancer still to configure." onZoom={zoom} />

      <h3 style={h3}>Assign a Static IP to the DFS Role</h3>
      <p style={p}>Open the DFS client access point in Failover Cluster Manager, select Resources, then select the IP Address.</p>
      <Screenshot src={IMG + 'image22.png'} alt="Opening the DFS Client Access Point resources" caption="Opening the DFS Client Access Point IP Address resource" onZoom={zoom} />
      <p style={p}>Double-click and assign a static IP that&apos;s available in your Azure subnet. This same IP will be the frontend of your Azure Load Balancer.</p>
      <Screenshot src={IMG + 'image23.png'} alt="Assigning a static IP to the DFS Client Access Point" caption="Assigning the static IP. Note this down, you'll need it for the Load Balancer." onZoom={zoom} />
      <p style={p}>Once the static IP is configured, start the DFS Role.</p>
      <Screenshot src={IMG + 'image24.png'} alt="Starting the DFS role after static IP configuration" caption="Starting the DFS Role" onZoom={zoom} />
      <p style={p}>The DFS Role should now be running with all resources showing as Online.</p>
      <Screenshot src={IMG + 'image25.png'} alt="DFS Role online with all resources showing green" caption="DFS Role online, all resources green" onZoom={zoom} />
      <p style={p}>Check DNS. You should see the appropriate records have been created automatically.</p>
      <Screenshot src={IMG + 'image26.png'} alt="DNS records created for the DFS cluster client access point" caption="DNS records created automatically for the DFS client access point" onZoom={zoom} />

      <Callout type="info">
        <strong>Don&apos;t try to access the share yet.</strong> Browsing to the DFS UNC path will show nothing. The Azure Load Balancer isn&apos;t in place yet and without Gratuitous ARP support the cluster can&apos;t advertise the IP correctly.
      </Callout>

      <h3 style={h3}>Set Up the Azure Load Balancer</h3>
      <p style={p}>Create a Standard Internal Load Balancer in the same Azure region as your DFS cluster.</p>
      <Screenshot src={IMG + 'image27.png'} alt="Creating a Standard Internal Load Balancer in Azure" caption="Creating a Standard Internal Load Balancer" onZoom={zoom} />
      <p style={p}><strong>Frontend IP:</strong> Use the same static IP you configured on the DFS client access point.</p>
      <Screenshot src={IMG + 'image28.png'} alt="Load Balancer frontend IP configuration matching the DFS cluster IP" caption="Frontend IP matching the DFS cluster static IP" onZoom={zoom} />
      <p style={p}><strong>Backend pool:</strong> Add both DFS cluster nodes.</p>
      <Screenshot src={IMG + 'image29.png'} alt="Load Balancer backend pool with both DFS cluster nodes" caption="Backend pool, both DFS cluster nodes added" onZoom={zoom} />
      <p style={p}><strong>Load balancing rule:</strong> Use HA Ports. <strong>Health probe:</strong> TCP port 135 (Remote Procedure Call).</p>
      <Screenshot src={IMG + 'image30.png'} alt="HA Ports load balancing rule and TCP 135 health probe" caption="HA Ports load balancing rule with TCP 135 health probe" onZoom={zoom} />
      <p style={p}>Once the Load Balancer is created, navigate to Insights and verify both backend servers show as healthy.</p>
      <Screenshot src={IMG + 'image31.png'} alt="Load Balancer Insights showing both backend nodes as healthy" caption="Both DFS cluster nodes showing as healthy in Load Balancer Insights" onZoom={zoom} />
      <p style={p}>Now go back and try browsing to your DFS cluster UNC path. It should now work — empty for now but accessible.</p>
      <Screenshot src={IMG + 'image32.png'} alt="DFS cluster UNC path now accessible" caption="DFS cluster UNC path now accessible" onZoom={zoom} />

      <h2 style={h2}>Configuring DFS Namespace Root Consolidation</h2>
      <p style={p}>With the cluster up and accessible, you can now configure root consolidation to make it respond to the old file server&apos;s name.</p>

      <h3 style={h3}>Enable the Registry Keys for Root Consolidation</h3>
      <p style={p}>On each DFS cluster node, run the following PowerShell commands as Administrator, then reboot each server one at a time. Monitor Failover Cluster Manager to make sure each node is back and operational before moving to the next.</p>
      <CodeBlock label="PowerShell — run on each cluster node then reboot">{`New-Item -Type Registry -Path "HKLM:SYSTEM\\CurrentControlSet\\Services\\Dfs"
New-Item -Type Registry -Path "HKLM:SYSTEM\\CurrentControlSet\\Services\\Dfs\\Parameters"
New-Item -Type Registry -Path "HKLM:SYSTEM\\CurrentControlSet\\Services\\Dfs\\Parameters\\Replicated"
Set-ItemProperty -Path "HKLM:SYSTEM\\CurrentControlSet\\Services\\Dfs\\Parameters\\Replicated" -Name "ServerConsolidationRetry" -Value 1`}</CodeBlock>

      <h3 style={h3}>Create the Root Consolidation Namespace</h3>
      <p style={p}>On one of the DFS cluster nodes, open the DFS Management Console and create a new Namespace. Select your DFS cluster&apos;s Client Access Point as the namespace server.</p>
      <Screenshot src={IMG + 'image33.png'} alt="Creating a new namespace in DFS Management Console" caption="Creating a new namespace. Select the DFS cluster client access point as the server." onZoom={zoom} />
      <p style={p}>The namespace name must be the name of your old file server with a <strong>#</strong> prefix. The hash tells DFS this namespace is using root consolidation. For example if your old server share path was <code style={code}>\\oldfileserver\share</code>, the namespace name should be <code style={code}>#oldfileserver</code>.</p>
      <Screenshot src={IMG + 'image34.png'} alt="Namespace name with # prefix for root consolidation" caption="Namespace name must be the old server name prefixed with #. This is what triggers root consolidation." onZoom={zoom} />
      <p style={p}>Create the namespace and validate it has been created successfully.</p>
      <Screenshot src={IMG + 'image35.png'} alt="Root consolidation namespace created successfully" caption="Root consolidation namespace created" onZoom={zoom} />

      <h3 style={h3}>Add the Azure File Share as a Folder Target</h3>
      <p style={p}>In the DFS Management Console, add a new folder to your <code style={code}>#oldfileserver</code> namespace. The folder target will be the Azure file share in your storage account. Make sure DNS is working so you can resolve your storage account via the private DNS zone before testing.</p>
      <Screenshot src={IMG + 'image36.png'} alt="Adding the Azure file share as a DFS folder target" caption="Adding the Azure Files share as a folder target under the root consolidation namespace" onZoom={zoom} />

      <h3 style={h3}>Update DNS and Move the SPNs</h3>
      <p style={p}>In your DNS Management Console on your Domain Controller, delete the old file server&apos;s DNS record and create a new A Record pointing to the frontend IP of your Azure Load Balancer.</p>

      <Callout type="warn">
        <strong>Before you touch any SPNs, take a backup.</strong> Modifying Service Principal Names incorrectly can break authentication for users and services. Before making any changes, list all existing SPNs on the old file server object and save the output somewhere safe:
        <CodeBlock label="Command Prompt">{`setspn -l oldfileserver`}</CodeBlock>
        Keep a record of what was there before you start. If something breaks, you will need it to restore the original state.
        <br /><br />
        <strong>Kerberos ticket caching can also catch you out.</strong> Even after the DNS and SPN changes are in place, end user machines may still have stale Kerberos tickets cached. If users cannot connect after the cutover, run the following to clear the cache and force a fresh ticket:
        <CodeBlock label="Command Prompt">{`klist purge`}</CodeBlock>
      </Callout>

      <p style={p}>Then using a Domain Administrator account, run the following in an Administrator Command Prompt to remove the SPNs from the old file server. Update the commands to reflect your actual server name and FQDN.</p>
      <CodeBlock label="Command Prompt — remove SPNs from old server">{`setspn -d HOST/oldfileserver oldfileserver
setspn -d HOST/oldfileserver.yourdomain.com oldfileserver`}</CodeBlock>

      <p style={p}>Add those SPNs to the DFS cluster client access point:</p>

      <Callout type="warn">
        <strong>Always use <code style={{ ...code, background: 'rgba(245,158,11,0.15)' }}>setspn -S</code> over <code style={{ ...code, background: 'rgba(245,158,11,0.15)' }}>setspn -A</code>.</strong> The <code style={{ ...code, background: 'rgba(245,158,11,0.15)' }}>-S</code> flag checks for existing duplicate SPNs before adding, preventing broken authentication. Never use <code style={{ ...code, background: 'rgba(245,158,11,0.15)' }}>-A</code> as it will add the SPN regardless of duplicates, which can cause Kerberos failures that are hard to diagnose.
      </Callout>

      <CodeBlock label="Command Prompt — add SPNs to DFS cluster">{`setspn -s HOST/oldfileserver DFS-CLUSTER-01
setspn -s HOST/oldfileserver.yourdomain.com DFS-CLUSTER-01`}</CodeBlock>


      <p style={p}>Verify the SPNs were added correctly:</p>
      <CodeBlock label="Command Prompt — verify">{`setspn -l DFS-CLUSTER-01`}</CodeBlock>
      <Screenshot src={IMG + 'image38.png'} alt="SPN list confirming old server host names now registered on DFS cluster" caption="SPNs from the old file server now correctly registered on the DFS cluster" onZoom={zoom} />

      <h3 style={h3}>Test the UNC Path</h3>
      <p style={p}>Browse to <code style={code}>\\oldfileserver\sharename</code>. You should see your Azure Files data served transparently through the DFS cluster, with no changes required on the client side.</p>
      <Screenshot src={IMG + 'image39.png'} alt="Browsing to the old UNC path and seeing Azure Files data" caption="The old UNC path now resolves to Azure Files via DFS root consolidation" onZoom={zoom} />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-card)', margin: '3rem 0' }} />

      <p style={p}>DFS root consolidation is the right approach when you need to preserve old UNC paths completely, without touching clients, scripts, or application configs. It&apos;s more infrastructure to manage than a simple DNS alias, but once it&apos;s in place it&apos;s invisible to end users.</p>
      <p style={p}>The key things to get right are the load balancer (Azure&apos;s lack of Gratuitous ARP will bite you if you skip it), the registry keys for root consolidation on both nodes, the # prefix on your namespace name, and the SPN migration. Get those four things right and the rest follows.</p>

      <div style={{ marginTop: '2rem', padding: '1rem 1.4rem', background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>Next up</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Using custom domain names for Azure file shares →</span>
      </div>

    </div>
  )
}

function Screenshot({ src, alt, caption, onZoom }: { src: string; alt: string; caption: string; onZoom: (src: string, alt: string) => void }) {
  return (
    <div style={{ margin: '1.25rem 0' }}>
      <div
        style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-card)', cursor: 'zoom-in' }}
        onClick={() => onZoom(src, alt)}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.01)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
        {caption} · <span style={{ color: '#60a5fa' }}>click to zoom</span>
      </p>
    </div>
  )
}

function ScreenshotGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '1.25rem 0' }}>
      {children}
    </div>
  )
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div style={{ margin: '1rem 0' }}>
      {label && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-subtle)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{label}</div>}
      <pre style={{ background: 'var(--surface-card)', border: '1px solid var(--border-card)', borderRadius: '8px', padding: '1rem 1.25rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#60a5fa', lineHeight: 1.7, margin: 0 }}>
        {children}
      </pre>
    </div>
  )
}

function Callout({ children, type }: { children: React.ReactNode; type: 'warn' | 'info' }) {
  const isWarn = type === 'warn'
  return (
    <div style={{
      borderRadius: '8px',
      padding: '1.1rem 1.4rem',
      margin: '1.5rem 0',
      borderLeft: `4px solid ${isWarn ? '#f59e0b' : '#0062f5'}`,
      background: isWarn ? 'rgba(245,158,11,0.07)' : 'rgba(0,98,245,0.08)',
      color: isWarn ? '#d4a855' : 'var(--text-muted)',
      fontSize: '0.93rem',
      lineHeight: 1.7,
    }}>
      {children}
    </div>
  )
}

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  margin: '40px 0 16px',
  letterSpacing: '-0.02em',
}

const h3: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--text-secondary)',
  margin: '2rem 0 0.75rem',
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
