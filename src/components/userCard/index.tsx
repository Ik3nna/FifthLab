import styles from "./index.module.css"
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

interface UserCardProps {
    img: string,
    name: { title: string, first: string, last: string },
    location: any,
    checked: boolean,
    email: string,
    phone: string
}

const UserCard = ({ img, name, location, checked, email, phone }: UserCardProps) => {
  return (
    <section className={styles.container}>
        <img src={img} />

        <div>
            <div>{name.first} {name.last}</div>

            <div>
                {location.street.number}, {location.street.name}, {location.city},{" "}
                {checked && location.country} 
            </div>

            <div className={styles.icons}>
                <div>
                    <MdOutlineEmail size={20} style={{ opacity: 0.6 }} /> 
                    <>{email}</>
                </div>
                
                <div>
                    <FiPhoneCall size={20} style={{ opacity: 0.6 }} /> 
                    <>{phone}</>
                </div>

                <div>
                    <FaArrowRight color="var(--whiteHex)" size={24} />
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserCard