import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { UserCreationDto, UserUpdateDto } from '../types/UserTypes';
import { formatCPF } from '../utils/formatterCpf';

interface UserFormProps<T> {
  onSubmit: (values: T) => void;
  initialValues: T;
  isEditMode?: boolean;
}

export const UserForm = <T extends UserUpdateDto | UserCreationDto>({
  initialValues,
  onSubmit,
  isEditMode = false,
}: UserFormProps<T>) => {
  const validationSchema = Yup.object().shape({
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido. Use o formato 000.000.000-00'),
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').notRequired(),
    gender: Yup.string().notRequired(),
    placeOfBirth: Yup.string().notRequired(),
    nationality: Yup.string().notRequired(),
    password: Yup.string(),
    idProfile: Yup.number(),
  });

  if (!isEditMode) {
    validationSchema.fields.password = Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/,
        'A senha deve conter letras maiúsculas, minúsculas, um número e um caractere especial.'
      );

    validationSchema.fields.idProfile = Yup.number().required(
      'Perfil é obrigatório'
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize
    >
      {({ isValid, setFieldValue, values  }) => (
        <Form className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <Field
                id="name"
                name="name"
                className="input"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
              <input
                id="cpf"
                name="cpf"
                maxLength={14}
                value={values.cpf}
                onChange={(e) => {
                  setFieldValue('cpf', formatCPF(e.target.value));
                }}
                className="input"
              />
              <ErrorMessage name="cpf" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className="input"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700">Naturalidade</label>
              <Field
                id="placeOfBirth"
                name="placeOfBirth"
                className="input"
              />
              <ErrorMessage name="placeOfBirth" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nacionalidade</label>
              <Field
                id="nationality"
                name="nationality"
                className="input"
              />
              <ErrorMessage name="nationality" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {!isEditMode && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="input"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Sexo</label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="input"
                  >
                    <option value="">Selecione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="idProfile" className="block text-sm font-medium text-gray-700">Perfil</label>
                  <Field
                    as="select"
                    id="idProfile"
                    name="idProfile"
                    className="input"
                  >
                    <option value="">Selecione um perfil</option>
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                  </Field>
                  <ErrorMessage name="idProfile" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!isValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={!isValid}
            >
              Salvar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};