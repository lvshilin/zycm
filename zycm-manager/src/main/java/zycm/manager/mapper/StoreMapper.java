package zycm.manager.mapper;

import java.util.List;

import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StoreEntity;

public interface StoreMapper {

	int addStore(StoreEntity stroeEntity);

	List<StoreEntity> queryStoreList(PageEntity pageEntity);

	int queryStoreNum();

	int delStore(StoreEntity stroeEntity);

}
