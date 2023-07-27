import styles from './ExpenseAdded.module.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
// import { FcDownload } from "react-icons/fc";
import DownloadCSV from "./DownloadCSV";


const ExpenseAdded = (props) => {

    const dispatch = useDispatch();
    const item = useSelector(state => state.expense.items);
    const isPremium = useSelector(state => state.theme.isActivated)
    console.log(item)

    const handleClick = (id , isEdit) => {
        props.getId(id , isEdit)
    }
  

    return(<div className={styles.tableContainer}>
       {isPremium && <div className={styles.download}><DownloadCSV data={item}/></div> }
       
      <table>
        <thead>
            <tr>
                <td>Amount</td>
                <td>Category</td>
                <td>Description</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
        </thead>
        <tbody>
        {item.map((expense) => (
          
        
            <tr   key = {Math.random()*10}>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td className={styles.edit} onClick={() => handleClick(expense.key ,true)}><AiFillEdit/></td>
                <td className={styles.delete} onClick={() => handleClick(expense.key ,false)}><AiFillDelete/></td>
            </tr>
))}
        </tbody>
      </table>
    </div>)

}
export default ExpenseAdded