import React, { useState } from 'react';
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
import SmallButton from '@/Shared/SmallButton';
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import LoadingSmallButton from '@/Shared/LoadingSmallButton';
import TextInput from '@/Shared/TextInput';
import Create from './Create';
import Modal from '@/Shared/Modals/Modal';
import SelectInput from '@/Shared/SelectInput';
import LoadingButton from '@/Shared/LoadingButton';

const Index = () => {
  const { organizations } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: ''
  });

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   post(route('organizations.store'));
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    post(route('organizations.store'), {
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
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const {
    data: orgData,
    meta: { links }
  } = organizations;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Organizations</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <SmallButton
          className={'mt-6 btn-indigo block'}
          onClick={() => setDialogIsOpen(true)}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Organization</span>
        </SmallButton>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">City</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {orgData.map(({ id, name, city, phone, deleted_at }) => {
              return (
                <tr
                  key={id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t">
                    <InertiaLink
                      href={route('organizations.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                    >
                      {name}
                      {deleted_at && (
                        <Icon
                          name="trash"
                          className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                        />
                      )}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('organizations.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {city}
                    </InertiaLink>
                  </td>
                  <td className="border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('organizations.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {phone}
                    </InertiaLink>
                  </td>
                  <td className="w-px border-t">
                    <InertiaLink
                      tabIndex="-1"
                      href={route('organizations.edit', id)}
                      className="flex items-center px-4 focus:outline-none"
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </InertiaLink>
                  </td>
                </tr>
              );
            })}
            {orgData.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />

      <ModalWithButtons
        title="Create Organization"
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        onConfirm={() => setDialogIsOpen(false)}
        buttons={
          <React.Fragment>
            <div className="p-1">
              <LoadingSmallButton
                loading={processing}
                onClick={handleSubmit}
                className="btn-indigo ml-auto"
              >
                Create Organization
              </LoadingSmallButton>
            </div>
          </React.Fragment>
        }
      >
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Name"
                name="name"
                errors={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Email"
                name="email"
                type="email"
                errors={errors.email}
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Phone"
                name="phone"
                type="text"
                errors={errors.phone}
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Address"
                name="address"
                type="text"
                errors={errors.address}
                value={data.address}
                onChange={e => setData('address', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="City"
                name="city"
                type="text"
                errors={errors.city}
                value={data.city}
                onChange={e => setData('city', e.target.value)}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Province/State"
                name="region"
                type="text"
                errors={errors.region}
                value={data.region}
                onChange={e => setData('region', e.target.value)}
              />
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Country"
                name="country"
                errors={errors.country}
                value={data.country}
                onChange={e => setData('country', e.target.value)}
              >
                <option value=""></option>
                <option value="CA">Canada</option>
                <option value="US">United States</option>
              </SelectInput>
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Postal Code"
                name="postal_code"
                type="text"
                errors={errors.postal_code}
                value={data.postal_code}
                onChange={e => setData('postal_code', e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
           
            </div>
          </form>
        </div>
      </ModalWithButtons>
    </div>
  );
};

Index.layout = page => <Layout title="Organizations" children={page} />;

export default Index;
