import React, { useState } from 'react'
import styles from "./index.module.css"
import TextInput from '@/components/textInput'
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaMale, FaFemale } from "react-icons/fa";
import Cards from '@/components/cards';
import { Country } from "country-state-city";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Switch from "react-switch";
import { BiCloudDownload } from "react-icons/bi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const usersData = [
    {
        text: "All users",
        icon: <IoIosPeople color="var(--whiteHex)" size={36} />,
        bgColor: "var(--pinkHex)"
    },
    {
        text: "Male users",
        icon: <FaMale color="var(--whiteHex)" size={36} />,
        bgColor: "var(--greenHex)"
    },
    {
        text: "All users",
        icon: <FaFemale color="var(--whiteHex)" size={36} />,
        bgColor: "var(--purpleHex)"
    },
] 

const Home: React.FC = () => {
    const [checked, setChecked] = useState(true);

    const countryData = Country.getAllCountries().map((item) => item.name).map(country => ({
        value: country,
        label: country
    }));

    return (
        <section className={styles.container}>
            <article>
                <div className={styles.wrapper1}>
                    <div>
                        <span>Hello, </span>
                        <span>Emerald</span>
                    </div>

                    <div>Welcome to your dashboard, kindly sort through the user base</div>

                    <TextInput 
                        value=''
                        onChange={()=>{}}
                        type='text'
                        placeholder='Find a user'
                        icon={
                            <AiOutlineSearch 
                                color='var(--inputPlaceholderHex)'
                                size={22} 
                            />
                        }
                    />
                </div>
                
                <div className={styles.wrapper2}>
                    <div>Show Users</div>

                    <div>
                        {usersData.map((item)=>(
                            <Cards 
                                icon={item.icon}
                                text={item.text}
                                bgColor={item.bgColor}
                            />
                        ))}
                    </div>
                </div>
            </article>

            <article className={styles.user_details}>
                <div className={styles.filter}>
                    <div>
                        <div>All Users</div>
                        <div>Filter by</div>
                    </div>

                    <div className={styles.inputs_container}>
                        <TextInput 
                            value=''
                            onChange={()=>{}}
                            type='text'
                            placeholder='Find in list'
                            className="input"
                            icon={
                                <AiOutlineSearch 
                                    color='var(--inputPlaceholderHex)'
                                    size={20} 
                                />
                            }
                        />

                        <Dropdown 
                            options={countryData} 
                            placeholder="country"
                            value={countryData.find((item)=>item.value==="Nigeria")}
                        />

                        <div className={styles.switch_container}>
                            <Switch 
                                checked={checked}
                                checkedIcon={false}
                                onColor="#30BBB5"
                                onHandleColor='#30BBB5'
                                onChange={()=>{}}
                            />

                            <span>Show Country</span>
                        </div>
                    </div>
                </div>

                <div className={styles.navigation}>
                    <a href="https://randomuser.me/api/?format=csv" className={styles.download}>
                        <BiCloudDownload size={30} color='var(--whiteHex)' />
                        <span>Download Results</span>
                    </a>

                    <div>
                        <div className={styles.previous}>
                            <MdKeyboardArrowLeft color='var(--nextHex)' size={24} />
                        </div>

                        <div className={styles.next}>
                            <MdKeyboardArrowRight color='var(--whiteHex)' size={24} />
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Home