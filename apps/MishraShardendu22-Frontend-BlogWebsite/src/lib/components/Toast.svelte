<script lang="ts">
  import { toastStore, type Toast } from "../toast";
  import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-svelte";
  import { fly, fade } from "svelte/transition";

  let containerStyle = $state('');

  const updatePosition = () => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 640) {
      // center on small screens
      containerStyle = 'left: 50%; transform: translateX(-50%); max-width: calc(100% - 2rem); right: auto;'
    } else {
      // align right on larger screens
      containerStyle = 'right: 1rem; left: auto; transform: none; max-width: 360px;'
    }
  };

  if (typeof window !== 'undefined') {
    updatePosition();
    window.addEventListener('resize', updatePosition);
  }

  let toasts = $state<Toast[]>([]);

  toastStore.subscribe((state) => {
    toasts = state.toasts;
  });

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
      case "warning":
        return AlertTriangle;
      case "info":
        return Info;
      default:
        return Info;
    }
  };

  const getStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-500/50 text-green-800 dark:text-green-200";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-500/50 text-red-800 dark:text-red-200";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500/50 text-yellow-800 dark:text-yellow-200";
      case "info":
        return "bg-amber-50 dark:bg-[#1e1a16] border-[#d9a55b]/50 text-amber-900 dark:text-[#f3ebdd]";
      default:
        return "bg-[#161311] border-[#2f2923] text-[#f3ebdd]";
    }
  };

  const getIconColor = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "text-[#4caf7d]";
      case "error":
        return "text-[#e06060]";
      case "warning":
        return "text-[#e8893f]";
      case "info":
        return "text-[#d9a55b]";
      default:
        return "text-[#8e8374]";
    }
  };
</script>

<div
  class="fixed top-4 z-50 flex flex-col gap-2 pointer-events-none w-full px-4"
  aria-live="polite"
  aria-atomic="true"
  style={containerStyle}
>
  {#each toasts as toast (toast.id)}
    <div
      transition:fly={{ x: 300, duration: 300 }}
      class="pointer-events-auto flex items-start gap-3 p-4 rounded-lg border-2 shadow-lg backdrop-blur-sm {getStyles(
        toast.type
      )}"
      role="alert"
    >
      {#if toast.type === "success"}
        <CheckCircle class="w-5 h-5 shrink-0 mt-0.5 {getIconColor(toast.type)}" />
      {:else if toast.type === "error"}
        <AlertCircle class="w-5 h-5 shrink-0 mt-0.5 {getIconColor(toast.type)}" />
      {:else if toast.type === "warning"}
        <AlertTriangle class="w-5 h-5 shrink-0 mt-0.5 {getIconColor(toast.type)}" />
      {:else}
        <Info class="w-5 h-5 shrink-0 mt-0.5 {getIconColor(toast.type)}" />
      {/if}
      <p class="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
      <button
        onclick={() => toastStore.remove(toast.id)}
        class="shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  {/each}
</div>
