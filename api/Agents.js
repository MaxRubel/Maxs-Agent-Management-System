const endpoint = import.meta.env.VITE_HTTP_SERVER;

export function getAllAgents() {
  console.log({ endpoint });
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/agents`).then((resp) => console.log(resp));
  });
}
