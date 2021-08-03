import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import TextInput from '@/Shared/TextInput';
import LoadingSmallButton from '@/Shared/LoadingSmallButton';
import SmallButton from '@/Shared/SmallButton';
import { Inertia } from '@inertiajs/inertia';

const Dashboard = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    Inertia.post(route('organizations.storeFromModal'), values, {
        preserveState: true,
        onSuccess: (page) => {
            setSending(false);
            setDialogIsOpen(false);
        },
        onError: (errors) => {
            setSending(false);
        }
    });
  }
  const handleChange = (e) => {
    const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
  }
  const { errors } = usePage().props;
  const [values, setValues] = useState({
    name: '',
    email: ''
});
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <p className="mb-12 leading-normal">
        Hey there! Welcome to Ping CRM, a demo app designed to help illustrate
        how
        <a
          className="mx-1 text-indigo-600 underline hover:text-orange-500"
          href="https://inertiajs.com"
        >
          Inertia.js
        </a>
        works with
        <a
          className="ml-1 text-indigo-600 underline hover:text-orange-500"
          href="https://reactjs.org/"
        >
          React
        </a>
        .
      </p>
      <div>
        <InertiaLink className="mr-1 btn-indigo" href="/500">
          500 error
        </InertiaLink>
        <InertiaLink className="btn-indigo" href="/404">
          404 error
        </InertiaLink>
      </div>

      <div className="overflow-hidden flex-1">
        <SmallButton className={'mt-6 btn-indigo block'} onClick={() => setDialogIsOpen(true)}>Open Modal</SmallButton>
      </div>

      <ModalWithButtons
                    title="Create Organization"
                    open={dialogIsOpen}
                    onClose={() => setDialogIsOpen(false)}
                    onConfirm={() => setDialogIsOpen(false)}
                    buttons={
                        <React.Fragment>
                            <div className="p-1">
                                <LoadingSmallButton
                                    loading={sending}
                                    onClick={handleSubmit}
                                    className="btn-indigo ml-auto"
                                >
                                    Save
                                </LoadingSmallButton>
                            </div>
                        </React.Fragment>
                    }
                >
                    <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                        <form onSubmit={handleSubmit}>
                            <div className="p-4 -mr-3 -mb-4 flex flex-wrap">
                                <TextInput
                                    className="pr-4 pb-4 w-full "
                                    label="Name"
                                    name="name"
                                    errors={errors.name}
                                    value={values.name}
                                    onChange={handleChange}
                                />

                                <TextInput
                                    className="pr-4 pb-4 w-full "
                                    label="E-Mail"
                                    name="email"
                                    type="email"
                                    errors={errors.email}
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>

                        </form>
                    </div>

                </ModalWithButtons>
    </div>
  );
};

// Persistent layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default Dashboard;
