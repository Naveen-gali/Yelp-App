import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ProfileStackParams,
  ProfileStackRoute,
} from '../../navigation/ProfileStack';
import {
  baseObjectInputType,
  baseObjectOutputType,
  objectUtil,
  ZodEffects,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from 'zod';

export type ContactUsScreenProps = NativeStackScreenProps<
  ProfileStackParams,
  ProfileStackRoute.Contact
>;

export type SchemaType = ZodObject<
  {
    date: ZodString;
    query: ZodString;
    name: ZodString;
    phone_number: ZodEffects<ZodNumber, number, number>;
    age: ZodNumber;
    email: ZodString;
  },
  'strip',
  ZodTypeAny,
  {
    [k_1 in keyof objectUtil.addQuestionMarks<
      baseObjectOutputType<{
        date: ZodString;
        query: ZodString;
        name: ZodString;
        phone_number: ZodEffects<ZodNumber, number, number>;
        age: ZodNumber;
        email: ZodString;
      }>,
      {
        [k in keyof baseObjectOutputType<{
          date: ZodString;
          query: ZodString;
          name: ZodString;
          phone_number: ZodEffects<ZodNumber, number, number>;
          age: ZodNumber;
          email: ZodString;
        }>]: undefined extends baseObjectOutputType<{
          date: ZodString;
          query: ZodString;
          name: ZodString;
          phone_number: ZodEffects<ZodNumber, number, number>;
          age: ZodNumber;
          email: ZodString;
        }>[k]
          ? never
          : k;
      }[keyof {
        date: ZodString;
        query: ZodString;
        name: ZodString;
        phone_number: ZodEffects<ZodNumber, number, number>;
        age: ZodNumber;
        email: ZodString;
      }]
    >]: objectUtil.addQuestionMarks<
      baseObjectOutputType<{
        date: ZodString;
        query: ZodString;
        name: ZodString;
        phone_number: ZodEffects<ZodNumber, number, number>;
        age: ZodNumber;
        email: ZodString;
      }>,
      {
        [k in keyof baseObjectOutputType<{
          date: ZodString;
          query: ZodString;
          name: ZodString;
          phone_number: ZodEffects<ZodNumber, number, number>;
          age: ZodNumber;
          email: ZodString;
        }>]: undefined extends baseObjectOutputType<{
          date: ZodString;
          query: ZodString;
          name: ZodString;
          phone_number: ZodEffects<ZodNumber, number, number>;
          age: ZodNumber;
          email: ZodString;
        }>[k]
          ? never
          : k;
      }[keyof {
        date: ZodString;
        query: ZodString;
        name: ZodString;
        phone_number: ZodEffects<ZodNumber, number, number>;
        age: ZodNumber;
        email: ZodString;
      }]
    >[k_1];
  },
  {
    [k_2 in keyof baseObjectInputType<{
      date: ZodString;
      query: ZodString;
      name: ZodString;
      phone_number: ZodEffects<ZodNumber, number, number>;
      age: ZodNumber;
      email: ZodString;
    }>]: baseObjectInputType<{
      date: ZodString;
      query: ZodString;
      name: ZodString;
      phone_number: ZodEffects<ZodNumber, number, number>;
      age: ZodNumber;
      email: ZodString;
    }>[k_2];
  }
>;
