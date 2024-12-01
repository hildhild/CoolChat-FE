import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { countries } from '/src/constants/country'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SelectLanguage({
  handleClick,
  showMenu,
  setShowMenu
}) {
  const { t, i18n } = useTranslation()
  const [flat, setFlat] = useState(null)
  const handleChangeFlat = (value) => {
    setShowMenu('')
    i18n.changeLanguage(value.short)
  }
  useEffect(() => {
    const flat = countries.find((item) => item.short === i18n.language)
    setFlat(flat ?? null)
  }, [i18n.language])
  return (
    <Dropdown
      placement='bottom-end'
      isOpen={showMenu === 'login'}
      shouldCloseOnInteractOutside={() => {
        setShowMenu('')
        return true
      }}
      classNames={{
        content: `!rounded-md`
      }}
    >
      <DropdownTrigger>
        {flat ? (
          <Avatar
            onClick={handleClick}
            radius='none'
            as='button'
            className='transition-transform h-7 w-10 object-cover rounded-[3px]'
            name={flat.name}
            size='sm'
            src={flat.avatar}
          />
        ) : (
          <div className='h-7 w-10 rounded-[3px] bg-slate-400 animate-pulse' />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label='countries' variant='flat'>
        {countries.map((country) => {
          return (
            <DropdownItem key={country.id} textValue={country.name} className='!rounded-md text-gray-800 duration-300 hover:!bg-coolchat hover:!text-white'>
              <button
                className='flex gap-2 items-center w-full'
                onClick={() => handleChangeFlat(country)}
              >
                <Avatar
                  radius='none'
                  alt={country.name}
                  className='flex-shrink-0 w-10 h-7 object-cover rounded-[3px]'
                  size='sm'
                  src={country.avatar}
                />
                <div className='flex flex-col'>
                  <span className='text-small'>{t(`${country.short}`)}</span>
                </div>
              </button>
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}
