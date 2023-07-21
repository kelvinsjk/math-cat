import { crossfade } from "svelte/transition";

const [send, receive] = crossfade({
  duration: (d) => Math.sqrt(d * 1200),
});

export { send, receive }