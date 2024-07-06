export default function UserProfile({params}){

    return(
      <div>
        <h1>
            profile
        </h1>
        <p>content
            <span>{params.id}</span>
        </p>
      </div>  
    )
}