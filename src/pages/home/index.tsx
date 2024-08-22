import React, { useEffect, useState } from 'react'
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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineEmail } from "react-icons/md";
import { getUsers } from '@/hooks/useApi';
import { CSVLink } from 'react-csv';
import UserCard from '@/components/userCard';
import { UserProps } from '@/types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { FaArrowLeft } from "react-icons/fa6";
import { FiPhoneCall } from 'react-icons/fi';
import Tags from '@/components/tags';


const Home: React.FC = () => {
    const [userData, setUserData] = useState<UserProps[]>([]);
    const [initialUserData, setInitialUserData] = useState<UserProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProps | null>();
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    const [queryParams, setQueryParams] = useState({
        page: 1,
        results: 3,
        gender: ""
    })

    const countryData = Country.getAllCountries().map((item) => item.name).map(country => ({
        value: country,
        label: country
    }));

    const handleUserSearch = ()=> {
        if (inputValue.trim() === "") {
            setUserData(initialUserData)
        } else {
            const filteredData = userData.filter(user =>
                user.name.first.toLowerCase().includes(inputValue.toLowerCase()) ||
                user.name.last.toLowerCase().includes(inputValue.toLowerCase())
            )

            setUserData(filteredData);
        }
    }

    const handleUserCardClick = (name: string)=> {
        const findUser = userData.find(item=>item.name.first === name);
        setSelectedUser(findUser);
    }

    const handleResultsClick = () => {
        setSelectedUser(null);
    }

    const handleCardClick = (card: string) => {
        setQueryParams(prevState => ({
            ...prevState,
            gender: card
        }));
    }

    const handleNextPage = ()=> {
        setQueryParams(prevState => ({
            ...prevState,
            page: prevState.page + 1
        }));
    }

    const handlePreviousPage = ()=> {
        setQueryParams(prevState => ({
            ...prevState,
            page: prevState.page > 1 ? prevState.page - 1 : prevState.page
        }));
    }
    
    const fetchUsers = async () => {
        setLoading(true);
        try {
          const result = await getUsers(queryParams);
          setUserData(result);
          setInitialUserData(result)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
    };

    useEffect(()=>{
        fetchUsers()
    }, [queryParams])

    useEffect(()=>{
        handleUserSearch()
    }, [inputValue])

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
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
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
                        {dataArray.map((item, idx)=>(
                            <Cards 
                                key={idx}
                                icon={item.icon}
                                text={item.text}
                                bgColor={item.bgColor}
                                gender={item.gender}
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                </div>
            </article>

            <article className={styles.user_details}>
                <div className={styles.filter}>
                    <div>
                        <div>{selectedUser ? "User List" : "All Users"}</div>
                        <div>Filter by</div>
                    </div>

                    <div className={`${styles.inputs_container} ${selectedUser && styles.opaque}`}>
                        <TextInput 
                            value={inputValue}
                            onChange={(e)=>setInputValue(e.target.value)}
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

                        <div className={styles.country_dropdown}>
                            <span>Country</span>
                            <Dropdown 
                                options={countryData} 
                                placeholder="country"
                                value={countryData.find((item)=>item.value==="Nigeria")}
                            />
                        </div>

                        <div className={styles.switch_container}>
                            <Switch 
                                checked={checked}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#30BBB5"
                                onHandleColor='#30BBB5'
                                onChange={()=>setChecked(!checked)}
                            />

                            <span>Show Country</span>
                        </div>
                    </div>
                </div>

                <SwitchTransition>
                    <CSSTransition
                        key={selectedUser ? 'selectedUser' : 'userCards'}
                        timeout={500}
                        classNames={{
                            enter: selectedUser ? styles.slideEnterFromRight : styles.slideEnterFromLeft,
                            enterActive: styles.slideEnterActive,
                            exit: selectedUser ? styles.slideExitToLeft : styles.slideExitToRight,
                            exitActive: selectedUser ? styles.slideExitActive1 : styles.slideExitActive,
                        }}
                    >
                        {!selectedUser ? (
                            <div className={styles.users_container}>
                                {userData.map((item, idx)=>(
                                    <UserCard 
                                        key={idx}
                                        img={item.picture.large}
                                        name={item.name}
                                        location={item.location}
                                        checked={checked}
                                        email={item.email}
                                        phone={item.phone}
                                        onClick={handleUserCardClick}
                                    />
                                ))}
                            </div>
                            ) : (
                            <section className={styles.selected_user}>
                                <div onClick={handleResultsClick}>
                                    <FaArrowLeft color="var(--resultsHex)" size={20} />
                                    <>Results</>
                                </div>
                                   
                                <div>
                                    <img src={selectedUser?.picture.large} />
        
                                    <div>
                                        <div className={styles.user_name}>
                                            {selectedUser?.name.title}{" "}
                                            {selectedUser?.name.first}{" "}
                                            {selectedUser?.name.last}{" "}
                                            <span>{selectedUser?.dob.age}</span>
                                        </div>
        
                                        <div className={styles.user_location}>
                                            {selectedUser?.location.street.number}, {selectedUser?.location.street.name}, {selectedUser?.location.city}  
                                        </div>
        
                                        <Tags 
                                            icon={<MdOutlineEmail size={24} />}
                                            text={selectedUser?.email}
                                            bgColor='var(--tag1BgHex)'
                                        />
        
                                        <Tags 
                                            text={`Joined: ${selectedUser?.registered.date}`}
                                            bgColor='var(--tag2BgHex)'
                                        />
        
                                        <div className={styles.user_phone}>
                                            <div>
                                                <FiPhoneCall size={20} />
                                                <>{selectedUser?.phone}</>
                                            </div>
                                            <div>{selectedUser?.cell}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </CSSTransition>
                </SwitchTransition>

                <div className={`${styles.navigation} ${selectedUser && styles.opaque}`}>
                    <CSVLink data={userData} target='_blank' className={styles.download}>
                        <BiCloudDownload size={30} color='var(--whiteHex)' />
                        <span>Download Results</span>
                    </CSVLink>

                    <div>
                        <div className={`${styles.previous} ${queryParams.page === 1 && styles.opaque}`} onClick={handlePreviousPage}>
                            <MdKeyboardArrowLeft color='var(--nextHex)' size={24} />
                        </div>

                        <div className={styles.next} onClick={handleNextPage}>
                            <MdKeyboardArrowRight color='var(--whiteHex)' size={24} />
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Home


const dataArray = [
    {
        text: "All users",
        icon: <IoIosPeople color="var(--whiteHex)" size={36} />,
        bgColor: "var(--pinkHex)",
        gender: ""
    },
    {
        text: "Male users",
        icon: <FaMale color="var(--whiteHex)" size={36} />,
        bgColor: "var(--greenHex)",
        gender: "male"
    },
    {
        text: "Female",
        icon: <FaFemale color="var(--whiteHex)" size={36} />,
        bgColor: "var(--purpleHex)",
        gender: "female"
    },
] 