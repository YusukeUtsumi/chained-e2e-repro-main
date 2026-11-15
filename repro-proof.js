// Fork-side proof script for the chained_e2e reproduction.
//
// This file lives in the FORK repo (the PR author's side). In the real
// gemini-cli chain, the equivalent is whatever test script the PR's
// package.json defines — the PR author controls it entirely, and it runs
// in the chained workflow with GEMINI_API_KEY in the environment.
//
// Here it proves the same three points with a DUMMY secret only:
//  (a) fork code executes in the chained (workflow_run) context,
//  (b) the chained job's secret is readable from fork-defined code,
//  (c) the run's result lands as a commit status on the fork SHA
//      (checked on the PR page, not in this script).
//
// Safety: DUMMY_SECRET is a made-up value Yusuke sets in his own test repo.
// It must NEVER be a real API key. The script prints only whether the
// variable was present and its first 4 characters — never the value.

const secret = process.env.DUMMY_SECRET;

console.log('REPRO-PROOF: fork-defined script is running in the chained job');
console.log('REPRO-PROOF: repo =', process.env.GITHUB_REPOSITORY || '(unknown)');
console.log('REPRO-PROOF: sha  =', process.env.GITHUB_SHA || '(unknown)');

if (secret) {
  console.log('REPRO-PROOF: DUMMY_SECRET is READABLE from fork code (first 4 chars: ' + secret.slice(0, 4) + ')');
} else {
  console.log('REPRO-PROOF: DUMMY_SECRET was NOT present in env');
}
