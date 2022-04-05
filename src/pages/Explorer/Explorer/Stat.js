import React from 'react'
import styles from './explorer.module.scss'

const Stat = ({ comments = 0, likes = 0 }) => {
    return (
        <div className={styles.stat}>
            <div className={styles.box}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.3345 14.1076C12.5078 13.9773 12.7187 13.9069 12.9355 13.9069H17V8H7V13.9069H8.9839C9.53619 13.9069 9.9839 14.3546 9.9839 14.9069V15.8752L12.3345 14.1076ZM9.9838 17.1264L9.58344 17.4275C9.33615 17.6054 8.9839 17.4356 8.9839 17.1383V14.9069H6.75C6.33579 14.9069 6 14.5836 6 14.1848V7.72201C6 7.32325 6.33579 7 6.75 7H17.25C17.6642 7 18 7.32325 18 7.72201V14.1848C18 14.5836 17.6642 14.9069 17.25 14.9069H12.9355L9.9838 17.1264Z" fill="#7A859E" />
                </svg>
                <div className={styles.number}>{comments}</div>
            </div>
            <div className={styles.box}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8904 11.0353C15.9669 11.7313 15.9226 12.4255 15.8057 13.0946L15.7591 13.4053L17.0931 14.3599C17.3356 14.5313 17.4822 14.821 17.4839 15.1086L17.503 18.4392C17.5048 18.7507 17.192 18.9616 16.9016 18.8614L14.8204 18.1831C14.5334 18.6819 14.0039 19.0093 13.3759 18.9998L10.9844 18.9637C10.3805 18.9545 9.8471 18.611 9.55447 18.1274L7.6254 18.6973C7.31192 18.7884 7.0208 18.5683 7.01901 18.2568L7.00002 14.9501C6.99823 14.6386 7.14165 14.3772 7.35809 14.2128L8.56109 13.3924L8.46144 12.8638C8.36165 12.3112 8.3099 11.7114 8.3549 11.1371C8.44451 9.9165 8.84842 8.74859 9.51902 7.75243L10.98 5.5942C11.5068 4.78754 12.6905 4.80543 13.2266 5.62815L14.7616 7.95146C15.3709 8.89509 15.7635 9.95524 15.8904 11.0353ZM9.25235 17.1702L8.01467 17.5358L8.00007 14.9952L9.13693 14.2199L9.66304 13.8611L9.54363 13.2278L9.44472 12.7031C9.35621 12.2115 9.31522 11.7019 9.35179 11.2355L9.35214 11.2306C9.42922 10.1807 9.77668 9.17665 10.352 8.32168L10.3527 8.32066L11.8123 6.1645L11.8168 6.15784L11.8212 6.15111C11.957 5.94307 12.2534 5.94755 12.3917 6.15973L12.3917 6.15974L12.3953 6.16518L13.9272 8.48381C14.4541 9.30123 14.7886 10.2115 14.8969 11.1274C14.9604 11.7092 14.9249 12.3061 14.8205 12.9033L14.8184 12.9152L14.8167 12.9271L14.7701 13.2378L14.6788 13.8479L15.1877 14.2121L16.4843 15.1399L16.4989 17.687L15.1128 17.2352L14.3462 16.9853L13.9507 17.6728C13.8315 17.88 13.6228 18.0059 13.3701 18.0021L10.9786 17.966C10.7529 17.9626 10.5325 17.8313 10.4076 17.6248L9.99899 16.9496L9.25235 17.1702ZM12.7683 10.7783C12.7677 11.0544 12.5365 11.2946 12.2253 11.2875C11.914 11.2805 11.6839 11.03 11.6845 10.7538C11.6851 10.4777 11.9163 10.2375 12.2275 10.2446C12.5388 10.2516 12.7689 10.5021 12.7683 10.7783ZM13.7681 10.8008C13.7663 11.6398 13.0746 12.3044 12.2231 12.2852C11.3717 12.266 10.6829 11.5703 10.6847 10.7313C10.6866 9.89225 11.3783 9.22765 12.2297 9.24685C13.0811 9.26606 13.7699 9.96179 13.7681 10.8008Z" fill="#7A859E" />
                </svg>
                <div className={styles.number}>{likes}</div>
            </div>
        </div>
    )
}

export default Stat