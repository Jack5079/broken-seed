/* eslint-env worker */
self.onmessage = async () => {
  const seedstxt = await fetch("./seeds.txt", {
    cache: "force-cache", // 101 MB JESUS
  }).then((res) => res.text());

  const seeds = seedstxt.split("\n").filter(Boolean).map((line) => {
    const parts = line.split(" ");
    return {
      seed: parts[0],
      repeats: {
        every: Number(parts[1].substring(0, parts[1].length - 1)),
        axis: parts[1].replace(/\d/g, ""),
      },
    };
  })

  self.postMessage(seeds[Math.floor(Math.random() * seeds.length)])
};
