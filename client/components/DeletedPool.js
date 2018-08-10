import React from 'react';

const DeletedPool = props => {
  props.endLoadingPool_f();
  return (
    <main>
      <h1>404! These aren't the droids you're looking for!</h1>
      <span>The pool creator has deleted this pool.</span>
    </main>
  )
}

export default DeletedPool;