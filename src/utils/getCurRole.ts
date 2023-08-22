// import getCurrentRole from "@/api/getCurrentRole";
// import type { RootState } from '../store/index.ts'
// import { useSelector,useDispatch } from 'react-redux'
// // import {setRole} from '@/store/modules/roleSlice.ts'
// const getCurRole = async(project_id)=>{
//     const dispatch = useDispatch()
//     let role = useSelector((state: RootState) => state.role.value)
//     if(role !== 0) {
//         return role
//     }else{
//       let res = await getCurrentRole(project_id)
//       res.data.code === 200 ?   dispatch(setRole(res.data.data.role)) : ''
//       role = useSelector((state: RootState) => state.role.value)
//       return role
//     }
// }
// export default getCurRole