import React from 'react';

const DeletedPool = props => {
  props.endLoadingPool_f();
  return (
    <main>
      <h2>404! These aren't the droids you're looking for!</h2>
      <p>The pool creator has deleted this pool.</p>
    </main>
  )
}

export default DeletedPool;