import React from 'react'
import styles from "./index.module.css"
import TextInput from '@/components/textInput'
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaMale, FaFemale } from "react-icons/fa";
import Cards from '@/components/cards';


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

            </article>
        </section>
    )
}

export default Home