import React from 'react'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

const Domain = ({state, domain, id}) => {
    const {contract}=state
    const [owner, setOwner] = useState(null)
  const [hasSold, setHasSold] = useState(false)
  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      const owner = await contract.ownerOf(id)
      setOwner(owner)
    }
  }

    const buyHandler = async () => {
        const tx = await contract.mint(id, { value: domain.cost });
        await tx.wait();
        console.log(tx);
        setHasSold(true)
    };
    useEffect(() => {
        getOwner()
      }, [hasSold])
  return (
    <div className='card'>
        <div className="card__info">
        <h3>
          {domain.isOwned || owner ? (
            <del>{domain.name}</del>
          ) : (
            <>{domain.name}</>
          )}
        </h3>
        
        <p>
        {domain.isOwned || owner ? (
            <>
              <small>
                Owned by:<br />
                <span>
                  {owner && owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                </span>
              </small>
            </>
          ) : (
            <>
              <strong>
                {ethers.formatUnits(domain.cost.toString(), 'ether')}
              </strong>
              ETH
            </>
          )}
        </p>
        </div>

        {!domain.isOwned && !owner &&(
        <button
          type="button"
          className='card__button'
          onClick={() => buyHandler()}
        >
          Buy It
        </button>
      )}
        
    </div>
  )
}

export default Domain
