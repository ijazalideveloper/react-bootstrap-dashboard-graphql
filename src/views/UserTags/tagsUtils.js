import services from "services";

export const handleSubmitAdd = async (values, goBack) => {
  let userTagObj = {
    name: values.name,
    description: values.description,
  };
  let data = await services.UserTagsService.getUserTags();
  data?.response?.data?.filter(e => e.name === values.name).length > 0 ? (alert('Tag already exists')) 
  : 
  services.UserTagsService.addUserTag(userTagObj)
    .then((response) => {
      alert('Tag created')
      goBack();
    })
    .catch((error) => {
      goBack();
    });
};
export const handleSubmitEdit = (values, goBack) => {
  let userTagObj = {
    tagId: values.id,
    name: values.name,
    description: values.description,
  };
  services.UserTagsService.updateUserTag(userTagObj)
    .then((response) => {
      goBack();
    })
    .catch((error) => {
      goBack();
    });
};

export const handleDelAddEdit = (values) => {
  const toast = useToast();
  services.UserTagsService.deleteUserTag({
    id: values.id,
    delete: true,
  })
    .then((response) => {
      goBack();
    })
    .catch((error) => {
      goBack();
    });
};
