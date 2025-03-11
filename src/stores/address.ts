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

const mockedAddresses = [
  {
    "id": "665994",
    "address_id": "fbdf4233-f0f5-4817-9c0e-54c583891a28",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "Tehranparsadadada",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 35.79736116672827,
    "lng": 51.45395278930665,
    "coordinate_mobile": "989909268227",
    "coordinate_phone_number": ""
  },
  {
    "id": "665993",
    "address_id": "53233bc8-8fc9-4782-a032-ceed57385cab",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "Tehran",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 35.75750813531327,
    "lng": 51.35593414306641,
    "coordinate_mobile": " ",
    "coordinate_phone_number": ""
  },
  {
    "id": "665992",
    "address_id": "06fc3867-5353-4571-a184-ab95be457130",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "Tehranpars",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 35.750512549587974,
    "lng": 51.51351928710938,
    "coordinate_mobile": "989909268224",
    "coordinate_phone_number": ""
  },
  {
    "id": "665991",
    "address_id": "ae94dadc-ba7b-4f94-85cf-f01238a10939",
    "region": {
      "id": 14526,
      "name": "آنلاین",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "تهران شهرک غرب فالن فانل",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 0,
    "lng": 0,
    "coordinate_mobile": "989197066405",
    "coordinate_phone_number": "982144673183"
  },
  {
    "id": "665990",
    "address_id": "d8179a12-7f39-47a4-a571-fc9761686b21",
    "region": {
      "id": 14526,
      "name": "آنلاین",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "تهرامن شهرک غرب شجریان شمالی کافه رییس",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 0,
    "lng": 0,
    "coordinate_mobile": "989197066405",
    "coordinate_phone_number": "982144673183"
  },
  {
    "id": "665989",
    "address_id": "b82b0311-c05c-4c42-bb87-cfc92563690d",
    "region": {
      "id": 14526,
      "name": "آنلاین",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "ااترنارنرنر  ا مبم مماب م مامبما بببم  مبامب ابما با بابا",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 0,
    "lng": 0,
    "coordinate_mobile": "989999999999",
    "coordinate_phone_number": "9821999999999"
  },
  {
    "id": "665988",
    "address_id": "e7418a88-977d-4678-8a66-f7e06852f62c",
    "region": {
      "id": 14526,
      "name": "آنلاین",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "شنسی ینشسمب نمشس تشسمن شسمنت شسیمن تش سمینت یسشمنت",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 0,
    "lng": 0,
    "coordinate_mobile": "989999999999",
    "coordinate_phone_number": "982199999999"
  },
  {
    "id": "665986",
    "address_id": "9fe362f0-4c41-445f-a628-fb4d0109242d",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "[ldespl[dc",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.09467662137096,
    "lng": 49.6885871887207,
    "coordinate_mobile": "989123454432",
    "coordinate_phone_number": ""
  },
  {
    "id": "665985",
    "address_id": "e8f0400f-38af-4019-940d-bd1baf5e3582",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "sdsdsadasd",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": -47,
    "lng": -30,
    "coordinate_mobile": " ",
    "coordinate_phone_number": ""
  },
  {
    "id": "665984",
    "address_id": "badbaf8c-4de6-4a92-b377-b5bcb0e84bcd",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "تهران، بزرگراه شیخ فضل الله نوری، شیخ فضل الله، بزرگراه جناح، بلوار شهید صالحی",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 35.70773118432615,
    "lng": 51.33608482635345,
    "coordinate_mobile": "989305520566",
    "coordinate_phone_number": "987133333333"
  },
  {
    "id": "665983",
    "address_id": "184b42f3-1764-4ace-87ae-057d2e832cc5",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "gdcc",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.08344563785523,
    "lng": 49.68197506948789,
    "coordinate_mobile": "989154312234",
    "coordinate_phone_number": ""
  },
  {
    "id": "665982",
    "address_id": "d1483fe6-919b-4afb-b77d-edb0cfe25f91",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "xhshdh",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.08714207539244,
    "lng": 49.68206088032593,
    "coordinate_mobile": "989182475564",
    "coordinate_phone_number": ""
  },
  {
    "id": "665981",
    "address_id": "33e7f2b3-8f50-4848-8abc-6f706a573206",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "fbsbdnf",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.08358781151362,
    "lng": 49.68043047440326,
    "coordinate_mobile": "989182732271",
    "coordinate_phone_number": ""
  },
  {
    "id": "665980",
    "address_id": "b892f00a-c7ff-4663-a61e-a394c456fbe2",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "sjand",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.104898234626106,
    "lng": 49.69684374813803,
    "coordinate_mobile": "989182374421",
    "coordinate_phone_number": ""
  },
  {
    "id": "665979",
    "address_id": "17f68078-171c-41c7-8c42-106d021bac15",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "sbsbs",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.10468501905836,
    "lng": 49.69676996404855,
    "coordinate_mobile": "989182742224",
    "coordinate_phone_number": ""
  },
  {
    "id": "665978",
    "address_id": "0606074d-09ee-452c-8e98-f7bf25d6b00c",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "ادرس",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.1236329,
    "lng": 49.713403,
    "coordinate_mobile": "989182345534",
    "coordinate_phone_number": ""
  },
  {
    "id": "665975",
    "address_id": "b589b522-ef7a-4385-ab73-0b760ba9b5e6",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "تهران شهر ری",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.10107335095898,
    "lng": 49.69588279724122,
    "coordinate_mobile": "989123423345",
    "coordinate_phone_number": ""
  },
  {
    "id": "665974",
    "address_id": "c4d6d58c-2602-4780-a0ee-8605e91a7add",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "dddd",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 34.09005646044008,
    "lng": 49.69725608825684,
    "coordinate_mobile": "989023453324",
    "coordinate_phone_number": "cccc"
  },
  {
    "id": "665973",
    "address_id": "83561ed7-cfcf-489f-8dda-11b671f0d61d",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "ttttest,test",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 35.6895,
    "lng": 51.389,
    "coordinate_mobile": " ",
    "coordinate_phone_number": ""
  },
  {
    "id": "665972",
    "address_id": "ffc664ea-b7fb-4dbb-b643-388de412c7b2",
    "region": {
      "id": 1,
      "name": "لویزان  -  شیان",
      "city_object": {
        "city_id": 333,
        "city_name": "تهران"
      },
      "state_object": {
        "state_id": 8,
        "state_name": "تهران"
      }
    },
    "address": "tehran, narmal",
    "last_name": "اکانت",
    "first_name": "تست",
    "gender": "",
    "lat": 35.69397053548927,
    "lng": 51.431293487548835,
    "coordinate_mobile": " ",
    "coordinate_phone_number": ""
  }
]

export const useAddressesStore = defineStore('addresses', () => {
  const addresses = ref([]);
  const loading = ref(false);

  async function createAddress  ({
    first_name,
    last_name,
    coordinate_mobile,
    coordinate_phone_number,
    address,
    lat,
    lang,
    gender,
  }: ICreateAddress) {
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
      // * sanitize error response err.response._data.message
      throw error;
    }
  };
  async function fetchAddresses (){
    try {
      loading.value = true
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
      addresses.value = data
      // addresses.value = mockedAddresses
      // console.log("🚀 ~ fetchAddresses ~ addresses.value:", addresses.value)
    } catch (error) {
      throw error;
    }finally{
      loading.value = false
    }
  };

  return {
    addresses,
    loading,
    fetchAddresses,
    createAddress,
  };
});
