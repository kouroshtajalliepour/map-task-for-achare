import { defineStore } from 'pinia';
import { ref } from 'vue';

type ICreateAddress = {
  first_name: string;
  last_name: string;
  coordinate_mobile: string;
  coordinate_phone_number: string;
  address: string;
  lat: number;
  lang: number;
  gender: string;
};

export const useAddressesStore = defineStore('addresses', () => {
  const addresses = ref([]);

  const createAddress = async ({
    first_name,
    last_name,
    coordinate_mobile,
    coordinate_phone_number,
    address,
    lat,
    lang,
    gender,
  }: ICreateAddress) => {
    try {
      // const response = await fetch(
      //   'https://stage.achareh.ir/api/karfarmas/address',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
      //     },
      //     body: JSON.stringify({
      //       first_name,
      //       last_name,
      //       coordinate_mobile,
      //       coordinate_phone_number,
      //       address,
      //       lat,
      //       lang,
      //       gender,
      //     }),
      //   }
      // );
      // const result = await response.json();
      // console.log(result);
    } catch (error) {
      throw error;
    }
  };
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
      const data = await response.json();
      addresses.value = data;
      console.log('Fetched addresses:', addresses.value);
    } catch (error) {
      throw error;
      // * sanitize error response err.response._data.message
    }
  };

  return {
    addresses,
    fetchAddresses,
    createAddress,
  };
});
