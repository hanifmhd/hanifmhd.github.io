import React from 'react'
import classnames from 'classnames'
// Character
import Korlap from '../../assets/image/Character/Korlap.png'
import Petani from '../../assets/image/Character/Petani.png'
import Agronom from '../../assets/image/Character/Agronom.png'
import Partner from '../../assets/image/Character/Partner.png'
import Client from '../../assets/image/Character/Client.png'
import Admin from '../../assets/image/Character/Admin.png'

export default function Character () {
  return (
    <div className={classnames('mt-[47px] mb-[44px] flex flex-row gap-[16px] flex-start flex-wrap')}>
        <img src={Petani} alt="Petani" className={classnames('w-[100px]')}/>
        <img src={Korlap} alt="Korlap" className={classnames('w-[100px]')}/>
        <img src={Agronom} alt="Agronom" className={classnames('w-[100px]')}/>
        <img src={Partner} alt="Partner" className={classnames('w-[100px]')}/>
        <img src={Client} alt="Client" className={classnames('w-[100px]')}/>
        <img src={Admin} alt="Admin" className={classnames('w-[100px]')}/>
    </div>
  )
}
