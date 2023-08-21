export default class LLMCaller {


  async sendPrompt(context, examples, messages) {
    return new Promise(async (resolve, reject) => {
      const payload = {
        instances: [{ ...context, ...examples, messages: messages }],
        parameters: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40
        }
      }

      try {
        const response = await fetch('https://us-central1-aiplatform.googleapis.com/v1/projects/celtic-rite-395810/locations/us-central1/publishers/google/models/chat-bison@001:predict', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ya29.a0AfB_byAJSiUysAVTYttzVoQ8ouN2Zc2MtTSPrhPLbsSfqbCwF_Q-2aYZVzbZhTLMJdBE5gDkMwZLIiCnCLpPZG5gPyHxTnLspK4pZrQXcqBI8VmCQzRPHtX5-Awg9Z19xfbZ_-or9CSawYnVxhSvYfP9xhMdL13Zl0Ya9C9kpWs0ISeWWtG1dwRVltXV9Uin8BgG6tw9MgJ8sn16HQmDVS9j8zLdwu32oLp9hR7t2ExzL7EoJKKMKIN9s7AG0jrMlROsTjNTi2Hwzl3UfoV9_RmuEkhlZvi87U0sTRyZYC47bKOvzcCc_Dv1n2-S5mRp-1nkQMWXA7pL-IO8_efSFZJKY8kJLJ5Aqwi1PoCnbFtDcikRaFF5eHzbGOelpMHUGhi7tZ4aUUNQoQ7hSg75CqJPWB8Om-tizmDNXwaCgYKAWcSARASFQHsvYlsqwAA0_OwokBmz31ZWyhEAg0429'
          },
          body: JSON.stringify(payload),
          method: 'POST',
        });

        if (response.status === 200) {
          resolve(await response.json());
        } else {
          const res = await response.json();
          reject(res.error.message);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
