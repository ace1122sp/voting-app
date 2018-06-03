import React from 'react';

const Profile = props => {

  // need to add Links to pools
  return (
    <div>
      <aside>
        <div>
          <b>username</b><br />
          <span>ace11</span>
        </div><br />
        <div>
          <b>total pools</b><br />
          <span>19</span>
        </div><br />
        <a href='#'>settings</a>
      </aside>
      <main>
        <nav>
          <button>all</button>
          <button>my pools</button>
          <button>following</button>
        </nav>
        <div>
          <p>here come all poolls you are interested in...</p>
        </div>
      </main>
    </div>
  );
}

export default Profile;
