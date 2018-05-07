import swal from 'sweetalert';

export const formatDescription = str => {
  if(str.length > 40){
    return str.slice(0, 32) + '...';
  }
  return str;
};

export function deleteAlert(deleteFunction, id, userId) {
  swal({
    title: 'Are you sure?',
    text:'If you do it, you will not be able to recover!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        deleteFunction(id, userId);
      }
    });
}
