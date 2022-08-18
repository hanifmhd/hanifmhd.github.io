import React from 'react'
// import classnames from 'classnames'
// import InputText from '../../components/InputText/InputText'
// import Dropdown from '../../components/Dropdown/Dropdown'
// import { Controller, useForm } from 'react-hook-form'

function Dashboard () {
  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm()

  // const onSubmit = () => {
  //   console.log('Submit')
  // }
  // const [formData, setFormData] = useState({})

  // const onChangeData = (name, value) => {
  //   console.log('name : ', name + 'Value : ' + value)
  //   setFormData(old => ({
  //     ...old,
  //     [name]: value
  //   }))
  // }
  // const initialOptions = [{ label: 'Tes', value: 'Tes' }]

  return (
    <>
    {/* <p className={classnames('text-black')}>Dashboard</p>
    <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          type="text"
          name="testing"
          placeholder="Testing"
          validationMessage= "Wajib Diisi"
          validateOptions={{
            minLen: 10,
            maxLen: 10
          }}
          label="Nomer Ponsel"
          register={register}
          required
          onChange={onChangeData}
          valueSet={formData.testing}
          errors={ errors.testing }
        />
          <Controller
             control={control}
             name="testingDropdown"
             defaultValue={formData.testingDropdown}
             rules= {{
               required: {
                 value: true,
                 message: 'Wajib Diisi'
               }
             }}
             render={({ field: { onChange, value, ref } }) => (
              <Dropdown
                placeholder= "Dropdown"
                options={initialOptions}
                required
                name='testingDropdown'
                onChange={(nameProv, valueData) => {
                  const setVal = initialOptions.filter(x => x.value === valueData)
                  onChange(setVal[0])
                  onChangeData(nameProv, setVal[0].value)
                }}
                control={control}
                value={value}
                inputRef={ref}
                errors={errors.testingDropdown}
                validationMessage="Wajib Diisi"
              />
             )}
           />
           <button className={classnames('btn-primary')}
                    type="submit"
                  >Submit</button>
           </form> */}
    </>
  )
}

export default Dashboard
