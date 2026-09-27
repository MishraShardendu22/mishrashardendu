<script lang="ts">
  import {
    Heart,
    Coffee,
    ArrowUpRight,
    Users,
    Rss,
    Folder,
    Award,
    Code,
    BookOpen,
    Shield,
    Package,
    Share2,
    Play,
    Camera,
    Terminal
  } from "lucide-svelte";

  const QUICK_LINKS = [
    { name: "Social Media", url: "https://mishrashardendu22.is-a.dev/links", icon: Users },
    { name: "RSS Feed", url: "https://mishrashardendu22.is-a.dev/feed.xml", icon: Rss },
    { name: "Project", url: "https://mishrashardendu22.is-a.dev/projects", icon: Folder },
    { name: "Certification", url: "https://mishrashardendu22.is-a.dev/certificates", icon: Award },
  ];

  const MY_WEBSITES = [
    { name: "Github Backup Lab", url: "https://github.mishrashardendu22.is-a.dev", icon: Code },
    { name: "Main", url: "https://mishrashardendu22.is-a.dev", icon: BookOpen },
    { name: "Admin Portal", url: "https://admin.mishrashardendu22.is-a.dev", icon: Shield },
    { name: "My UI Library", url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev", icon: Package },
  ];

  const SOCIAL_MEDIA = [
    { name: "Twitter", url: "https://x.com/Shardendu_M", icon: Share2 },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shardendumishra22", icon: Users },
    { name: "YouTube", url: "https://www.youtube.com/@Shardendu_Mishra", icon: Play },
    { name: "Instagram", url: "https://www.instagram.com/mishrashardendu22", icon: Camera },
  ];

  const CODING_PROFILES = [
    { name: "LeetCode", url: "https://leetcode.com/u/ShardenduMishra22/", icon: Award },
    { name: "GitHub Main", url: "https://github.com/MishraShardendu22", icon: Code },
    { name: "GitHub Learning", url: "https://github.com/ShardenduMishra22", icon: Folder },
    { name: "Codeforces", url: "https://codeforces.com/profile/MishraShardendu22", icon: Terminal },
  ];

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
</script>

<footer class="w-full bg-[#0e0c0a] border-t border-[#2f2923] py-16 px-6 mt-16 relative overflow-hidden">
  <div class="max-w-7xl mx-auto relative z-10">
    <!-- Top section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="space-y-8">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl font-bold text-[#f3ebdd] font-heading">Shardendu Mishra</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full border border-[#d9a55b]/30 bg-[#d9a55b]/10 text-[#d9a55b] font-mono">
              Ecosystem
            </span>
          </div>
          <p class="text-[#b9ae9d] text-lg leading-relaxed max-w-xl">
            Software Engineer engineering modern, high-impact systems.
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm text-[#8e8374]">
          <span>Made with</span>
          <Heart class="w-4 h-4 text-red-500" />
          <span>and</span>
          <Coffee class="w-4 h-4 text-[#d9a55b]" />
          <span>by Shardendu Mishra</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span class="px-4 py-2 bg-[#1e1a16] border border-[#2f2923] rounded-lg text-xs text-[#b9ae9d] font-semibold">
            Go
          </span>
          <span class="px-4 py-2 bg-[#d9a55b]/10 border border-[#d9a55b]/25 rounded-lg text-xs text-[#d9a55b] font-semibold">
            Svelte
          </span>
          <span class="px-4 py-2 bg-[#1e1a16] border border-[#2f2923] rounded-lg text-xs text-[#b9ae9d] font-semibold">
            Kubernetes
          </span>
          <span class="px-4 py-2 bg-[#1e1a16] border border-[#2f2923] rounded-lg text-xs text-[#b9ae9d] font-semibold">
            AI/ML
          </span>
        </div>

        <p class="text-xs text-[#8e8374]">
          &copy; 2026 Shardendu Mishra. All rights reserved.
        </p>
      </div>

      <!-- Right column contact prompt / quote -->
      <div class="flex flex-col justify-center space-y-6 lg:pl-12">
        <div class="border border-[#2f2923] bg-[#161311]/50 p-8 rounded-2xl">
          <h3 class="text-xl font-bold text-[#f3ebdd] mb-2 font-heading">Keep in Touch</h3>
          <p class="text-sm text-[#b9ae9d] mb-6">
            If you want to chat about engineering, technology, or have questions about my work, feel free to reach out.
          </p>
          <a
            href="https://mishrashardendu22.is-a.dev/#contact"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            <span>Send a Message</span>
            <ArrowUpRight class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>

    <!-- 4-Column Links Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-[#2f2923]">
      <!-- Quick Links -->
      <div>
        <h4 class="text-sm font-semibold text-[#f3ebdd] mb-6 uppercase tracking-wider font-heading">Quick Links</h4>
        <ul class="space-y-4">
          {#each QUICK_LINKS as link}
            <li>
              <a
                href={link.url}
                class="flex items-center gap-2.5 text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- My Websites -->
      <div>
        <h4 class="text-sm font-semibold text-[#f3ebdd] mb-6 uppercase tracking-wider font-heading">My Websites</h4>
        <ul class="space-y-4">
          {#each MY_WEBSITES as link}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Social Media -->
      <div>
        <h4 class="text-sm font-semibold text-[#f3ebdd] mb-6 uppercase tracking-wider font-heading">Social Media</h4>
        <ul class="space-y-4">
          {#each SOCIAL_MEDIA as link}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Coding Profiles -->
      <div>
        <h4 class="text-sm font-semibold text-[#f3ebdd] mb-6 uppercase tracking-wider font-heading">Coding</h4>
        <ul class="space-y-4">
          {#each CODING_PROFILES as link}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
              >
                <svelte:component this={link.icon} class="w-4 h-4 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                <span>{link.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Banner & Scroll To Top -->
    <div class="mt-16 pt-8 border-t border-[#2f2923] flex flex-col items-center gap-8">
      <div class="w-full flex justify-between items-center text-xs text-[#8e8374]">
        <span>&copy; 2026 Shardendu Mishra</span>
        <button
          type="button"
          on:click={handleScrollToTop}
          class="flex items-center gap-1.5 hover:text-[#d9a55b] transition-colors duration-200"
        >
          <span>Back to Top</span>
          <span>&uarr;</span>
        </button>
      </div>
    </div>
  </div>
</footer>
