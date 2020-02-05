async function dispalyCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.name);
    const commits = await getCommits(repos[0]);
    console.log(commits)
  } catch (e) {
    throw e;
  }
}

dispalyCommits()


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, name: 'lemon' });
    }, 2000);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling API...')
      resolve(['repo1', 'repo2', 'repo3'])
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['Commit'])
      // reject(new Error('i reject this commmits'));
    }, 2000);
  });
}