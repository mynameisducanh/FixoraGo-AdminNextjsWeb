// import { useRequestServices } from 
// import { RequestServiceActionDialog } from 
// import { RequestServiceDeleteDialog } from 

// export function RequestServiceDialogs() {
//   const { open, setOpen, currentRow, setCurrentRow } = useRequestServices()
//   return (
//     <>
//       <RequestServiceActionDialog
//         key='request-service-add'
//         open={open === 'add'}
//         onOpenChange={() => setOpen('add')}
//       />

//       {currentRow && (
//         <>
//           <RequestServiceActionDialog
//             key={`request-service-edit-${currentRow.id}`}
//             open={open === 'edit'}
//             onOpenChange={() => {
//               setOpen('edit')
//               setTimeout(() => {
//                 setCurrentRow(null)
//               }, 500)
//             }}
//             currentRow={currentRow}
//           />

//           <RequestServiceDeleteDialog
//             key={`request-service-delete-${currentRow.id}`}
//             open={open === 'delete'}
//             onOpenChange={() => {
//               setOpen('delete')
//               setTimeout(() => {
//                 setCurrentRow(null)
//               }, 500)
//             }}
//             currentRow={currentRow}
//           />
//         </>
//       )}
//     </>
//   )
// } 