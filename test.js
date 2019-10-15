async function huj() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve({'a': 12}), 100);
  });
}

async function test() {
  return (await huj())
}

test().then(msg => console.log(msg));
