import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAddressesStore = defineStore('addresses', () => {
  const addresses = ref([]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        'https://stage.achareh.ir/api/karfarmas/address',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      addresses.value = data;
      console.log('Fetched addresses:', addresses.value);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    addresses,
    fetchAddresses,
  };
});
