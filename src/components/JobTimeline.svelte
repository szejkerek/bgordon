<script>
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  let logoErrors = $state({});
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const element = document.querySelector('.timeline-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
  
  function handleLogoError(index, type) {
    logoErrors[`${type}-${index}`] = true;
  }
  
  // Work experience data
  const workExperience = [
    {
      company: "Radicate",
      logo: "/images/logos/radicate.png",
      role: "Unity Developer",
      period: "May 2023 — Present",
      description: "Working on 2 applications simultaneously: maintaining the mobile game Jump Heroes (available on mobile and PC), and developing an unannounced PC game with an 8-person team.",
      skills: ["Unity", "C#", "Mobile", "PC"]
    },
    {
      company: "IT Silesia",
      logo: "/images/logos/itsilesia.png",
      role: "Mid Unity VR Developer",
      period: "April 2022 — July 2023",
      description: "Developed 6 independent VR simulations using Oculus headsets. Projects outsourced by international company TransFr with bi-weekly client meetings.",
      skills: ["Unity", "VR", "Oculus XR", "C#"]
    }
  ];
  
  // Education data
  const education = [
    {
      company: "Silesian University of Technology",
      logo: "/images/logos/polsl.png",
      role: "MSc Computer Science",
      period: "2024 — 2025",
      description: "Master's degree in Game and Software Development. Focus on graphics programming and rendering techniques.",
      skills: ["Game Dev", "Graphics", "Research"]
    },
    {
      company: "Silesian University of Technology",
      logo: "/images/logos/polsl.png",
      role: "BSc Computer Science",
      period: "2020 — 2024",
      description: "Bachelor's degree in Computer Software Development. Co-authored publication on rehabilitation using depth sensors.",
      skills: ["Software Dev", "Unity", "Research"]
    }
  ];
</script>

<section id="experience" class="timeline-section" class:visible={visible}>
  <div class="timeline-container">
    <div class="two-column-grid">
      <!-- Work Experience Column -->
      <div class="timeline-column">
        <header class="column-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <h2 class="column-title">Work Experience</h2>
        </header>
        
        <div class="timeline">
          {#each workExperience as job, index}
            <article class="timeline-item" style="--delay: {index * 0.15}s">
              <div class="timeline-marker">
                <div class="marker-dot"></div>
                {#if index < workExperience.length - 1}
                  <div class="marker-line"></div>
                {/if}
              </div>
              
              <div class="timeline-content card hover-surface">
                <div class="job-header">
                  <div class="company-logo">
                    {#if job.logo && !logoErrors[`work-${index}`]}
                      <img src={job.logo} alt={job.company} onerror={() => handleLogoError(index, 'work')} />
                    {:else}
                      <div class="logo-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                      </div>
                    {/if}
                  </div>
                  
                  <div class="job-info">
                    <h3 class="company-name">{job.company}</h3>
                    <p class="job-role">{job.role}</p>
                  </div>
                </div>
                
                <div class="job-meta">
                  <span class="job-period">{job.period}</span>
                </div>
                
                <p class="job-description">{job.description}</p>
                
                <div class="job-skills">
                  {#each job.skills as skill}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
      
      <!-- Education Column -->
      <div class="timeline-column">
        <header class="column-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <h2 class="column-title">Education</h2>
        </header>
        
        <div class="timeline">
          {#each education as edu, index}
            <article class="timeline-item" style="--delay: {(index + 2) * 0.15}s">
              <div class="timeline-marker">
                <div class="marker-dot education"></div>
                {#if index < education.length - 1}
                  <div class="marker-line"></div>
                {/if}
              </div>
              
              <div class="timeline-content card hover-surface">
                <div class="job-header">
                  <div class="company-logo">
                    {#if edu.logo && !logoErrors[`edu-${index}`]}
                      <img src={edu.logo} alt={edu.company} onerror={() => handleLogoError(index, 'edu')} />
                    {:else}
                      <div class="logo-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                      </div>
                    {/if}
                  </div>
                  
                  <div class="job-info">
                    <h3 class="company-name">{edu.company}</h3>
                    <p class="job-role">{edu.role}</p>
                  </div>
                </div>
                
                <div class="job-meta">
                  <span class="job-period">{edu.period}</span>
                </div>
                
                <p class="job-description">{edu.description}</p>
                
                <div class="job-skills">
                  {#each edu.skills as skill}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .timeline-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
    opacity: 0;
    transform: translateY(24px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .timeline-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .timeline-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .two-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  
  .timeline-column {
    display: flex;
    flex-direction: column;
  }
  
  .column-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-subtle);
  }
  
  .header-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-glow);
    border-radius: var(--radius);
    color: var(--accent);
  }
  
  .column-title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }
  
  .timeline {
    position: relative;
  }
  
  .timeline-item {
    display: flex;
    gap: 1.25rem;
    padding-bottom: 2rem;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--delay);
  }
  
  .timeline-section.visible .timeline-item {
    opacity: 1;
    transform: translateX(0);
  }
  
  .timeline-item:last-child {
    padding-bottom: 0;
  }
  
  .timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 16px;
  }
  
  .marker-dot {
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--accent-glow);
    flex-shrink: 0;
  }
  
  .marker-dot.education {
    background: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);
  }
  
  .marker-line {
    width: 2px;
    flex: 1;
    background: linear-gradient(to bottom, var(--accent), var(--border-light));
    margin-top: 0.5rem;
  }
  
  .timeline-content {
    flex: 1;
    padding: 1.5rem;
  }
  
  .job-header {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    margin-bottom: 0.75rem;
  }
  
  .company-logo {
    width: 40px;
    height: 40px;
    background: var(--bg-elevated);
    border-radius: var(--radius);
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .company-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }
  
  .logo-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--text-muted);
  }
  
  .job-info {
    flex: 1;
    min-width: 0;
  }
  
  .company-name {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.125rem;
    line-height: 1.3;
  }
  
  .job-role {
    font-size: 0.85rem;
    color: var(--accent);
    font-weight: 500;
  }
  
  .job-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }
  
  .job-period {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .job-description {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 0.875rem;
  }
  
  .job-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }
  
  .skill-tag {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: var(--bg-elevated);
    border-radius: 4px;
    color: var(--text-secondary);
  }
  
  @media (max-width: 900px) {
    .two-column-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
  
  @media (max-width: 600px) {
    .timeline-section {
      padding: 3.5rem 0;
    }
    
    .timeline-item {
      gap: 1rem;
    }
    
    .timeline-marker {
      display: none;
    }
    
    .timeline-item {
      padding-left: 1rem;
      border-left: 2px solid var(--accent);
    }
    
    .column-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .header-icon {
      width: 40px;
      height: 40px;
    }
  }
</style>
