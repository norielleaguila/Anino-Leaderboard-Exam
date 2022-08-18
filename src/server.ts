async function main() {
  // create a new actionhero process
  const { Process } = await import("actionhero");
  const app = new Process();

  // handle unix signals and uncaught exceptions & rejections
  app.registerProcessSignals((exitCode) => {
    process.exit(exitCode);
  });

  await app.start();
}

main();
