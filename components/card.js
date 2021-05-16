import Image from 'next/image'
import styles from '../styles/Card.module.css'

export default function Card(props) {
    return(
        <div className={styles.card}>
            <Image className={styles.iimg} loading="eager" src={props.src} width={300} height={300} />
            <h3 className={styles.title}>{props.title}</h3>
            <ul>
                <li>subject: {props.subject}</li>
                <li>topic: {props.topic}</li>
                <li>group: {props.group}</li>
                <li>level: {props.level}</li>
            </ul>
            <p>{props.description}</p>
        </div>
    )
}